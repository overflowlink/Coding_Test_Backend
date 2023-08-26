import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProblemEntity } from '../../components/entities/problem.entity';
import { CreateProblemDto } from '../dtos/createProblem.dto';
import { CreateProblemResponse } from '../responses/createProblem.response';
import { FindOneProblemDto } from '../dtos/findOneProblem.dto';
import { FindOneProblemResponse } from '../responses/findOneProblem.response';
import { FindProblemDto } from '../dtos/findProblem.dto';
import { FindProblemResponse } from '../responses/findProblem.response';

import { ExampleEntity } from '../../components/entities/example.entity';
import { CreateProblemExampleDto } from '../dtos/createProblemExample.dto';
import { FindProblemExampleDto } from '../dtos/findProblemExample.dto';
import { FindProblemExampleResponse } from '../responses/findProblemExample.response';

import { TestcaseEntity } from '../../components/entities/testcase.entity';
import { CreateProblemTestcaseDto } from '../dtos/createProblemTestcase.dto';
import { FindProblemTestcaseDto } from '../dtos/findProblemTestcase.dto';
import { FindProblemTestcaseResponse } from '../responses/findProblemTestcase.response';

import { ProblemNotFoundException } from '../exceptions/problemNotFound.exception';


@Injectable()
export class ManageProblemService {
    constructor(@InjectRepository(ProblemEntity) private __problemRepository: Repository<ProblemEntity>,
                @InjectRepository(ExampleEntity) private __exampleRepository: Repository<ExampleEntity>,
                @InjectRepository(TestcaseEntity) private __testcaseRepository: Repository<TestcaseEntity>) {}

    async create(createProblemDto: CreateProblemDto): Promise<CreateProblemResponse> {
        // Insert new problem data
        const PROBLEM_TO_INSERT:ProblemEntity = new ProblemEntity()
        PROBLEM_TO_INSERT.title = createProblemDto.title

        PROBLEM_TO_INSERT.timeLimitSecond = createProblemDto.timeLimitSecond
        PROBLEM_TO_INSERT.memoryLimitMb = createProblemDto.memoryLimitMb
        
        PROBLEM_TO_INSERT.problemExplain = Buffer.from(createProblemDto.problemExplain, "utf-8")
        PROBLEM_TO_INSERT.inputExplain = Buffer.from(createProblemDto.inputExplain, "utf-8")
        PROBLEM_TO_INSERT.outputExplain = Buffer.from(createProblemDto.outputExplain, "utf-8")
        PROBLEM_TO_INSERT.note = Buffer.from(createProblemDto.note, "utf-8")

        const INSERTED_PROBLEM_ID:number = (await this.__problemRepository.manager.save(PROBLEM_TO_INSERT)).id


        return {
            id: INSERTED_PROBLEM_ID
        }
    }

    async findOne(findOneProblemDto: FindOneProblemDto): Promise<FindOneProblemResponse> {
        const FOUND_PROBLEM_ENTITY:ProblemEntity = await this.__problemRepository.findOne({
            where: {id: findOneProblemDto.id}
        })
        if(FOUND_PROBLEM_ENTITY == null) throw new ProblemNotFoundException()
        
        return {
            id: FOUND_PROBLEM_ENTITY.id,
            title: FOUND_PROBLEM_ENTITY.title,

            timeLimitSecond: FOUND_PROBLEM_ENTITY.timeLimitSecond,
            memoryLimitMb: FOUND_PROBLEM_ENTITY.memoryLimitMb,

            problemExplain: FOUND_PROBLEM_ENTITY.problemExplain.toString(),
            inputExplain: FOUND_PROBLEM_ENTITY.inputExplain.toString(),
            outputExplain: FOUND_PROBLEM_ENTITY.outputExplain.toString(),
            note: FOUND_PROBLEM_ENTITY.note.toString()
        }
    }

    async find(findProblemDto: FindProblemDto): Promise<FindProblemResponse> {
        const ROW_PER_PAGE:number = 50

        
        const FIND_PROBLEM_RESPONSE = new FindProblemResponse()

        const FOUND_PROBLEM_ENTITIES:ProblemEntity[] = await this.__problemRepository.find({
            select: {
                id: true,
                title: true
            },
            order: {
                id: "ASC"
            },
            skip: ROW_PER_PAGE*(findProblemDto.page-1),
            take: ROW_PER_PAGE
        })
        FIND_PROBLEM_RESPONSE.briefProblemInfos = FOUND_PROBLEM_ENTITIES.map((entity) => {
            return {id: entity.id, title: entity.title}
        })
        return FIND_PROBLEM_RESPONSE
    }

    
    async createExample(createProblemExampleDto: CreateProblemExampleDto): Promise<void> {    
        // Insert new example data
        const RELATED_PROBLEM:ProblemEntity = await this.__problemRepository.findOneBy({
            id: createProblemExampleDto.problemId
        })
        if(RELATED_PROBLEM == null) throw new ProblemNotFoundException()

        const EXAMPLE_TO_INSERT:ExampleEntity = new ExampleEntity()
        EXAMPLE_TO_INSERT.inputValue = Buffer.from(createProblemExampleDto.inputValue, "utf-8")
        EXAMPLE_TO_INSERT.outputValue = Buffer.from(createProblemExampleDto.outputValue, "utf-8")
        EXAMPLE_TO_INSERT.problem = RELATED_PROBLEM

        await this.__exampleRepository.manager.save(EXAMPLE_TO_INSERT)
    }

    async findExample(findProblemExampleDto: FindProblemExampleDto): Promise<FindProblemExampleResponse> {
        const FIND_PROBLEM_EXAMPLE_RESPONSE:FindProblemExampleResponse = new FindProblemExampleResponse()

        const RELATED_PROBLEM:ProblemEntity = await this.__problemRepository.findOneBy({
            id: findProblemExampleDto.problemId
        })
        if(RELATED_PROBLEM == null) throw new ProblemNotFoundException()

        const FOUND_EXAMPLE_ENTITIES:ExampleEntity[] = await this.__exampleRepository.find({
            select: {
                id: true,
                inputValue: true,
                outputValue: true
            },
            where: {
                problem: RELATED_PROBLEM
            },
            order: {
                id: "ASC"
            }
        })
        FIND_PROBLEM_EXAMPLE_RESPONSE.problemExampleInfos = FOUND_EXAMPLE_ENTITIES.map((entity) => {
            return {
                id: entity.id,
                inputValue: entity.inputValue.toString(),
                outputValue: entity.outputValue.toString()}
        })
        return FIND_PROBLEM_EXAMPLE_RESPONSE
    }

    
    async createTestcase(createProblemTestcaseDto: CreateProblemTestcaseDto): Promise<void> {
        // Inset new testcase data
        const RELATED_PROBLEM:ProblemEntity = await this.__problemRepository.findOneBy({
            id: createProblemTestcaseDto.problemId
        })
        if(RELATED_PROBLEM == null) throw new ProblemNotFoundException()

        const TESTCASE_TO_INSERT:TestcaseEntity = new TestcaseEntity()
        TESTCASE_TO_INSERT.inputValue = Buffer.from(createProblemTestcaseDto.inputValue, "utf-8")
        TESTCASE_TO_INSERT.outputValue = Buffer.from(createProblemTestcaseDto.outputValue, "utf-8")
        TESTCASE_TO_INSERT.problem = RELATED_PROBLEM

        await this.__testcaseRepository.manager.save(TESTCASE_TO_INSERT)
    }

    async findTestcase(findProblemTestcaseDto: FindProblemTestcaseDto): Promise<FindProblemTestcaseResponse> {
        const FIND_PROBLEM_TESTCASE_RESPONSE:FindProblemTestcaseResponse = new FindProblemTestcaseResponse()

        const RELATED_PROBLEM:ProblemEntity = await this.__problemRepository.findOneBy({
            id: findProblemTestcaseDto.problemId
        })
        if(RELATED_PROBLEM == null) throw new ProblemNotFoundException()

        const FOUND_TESTCASE_ENTITIES:TestcaseEntity[] = await this.__testcaseRepository.find({
            select: {
                id: true,
                inputValue: true,
                outputValue: true
            },
            where: {
                problem: RELATED_PROBLEM
            },
            order: {
                id: "ASC"
            }
        })
        FIND_PROBLEM_TESTCASE_RESPONSE.problemTestcaseInfos = FOUND_TESTCASE_ENTITIES.map((entity) => {
            return {
                id: entity.id,
                inputValue: entity.inputValue.toString(),
                outputValue: entity.outputValue.toString()}
        })
        return FIND_PROBLEM_TESTCASE_RESPONSE
    }
}
