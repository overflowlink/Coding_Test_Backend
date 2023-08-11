import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProblemDto } from '../dtos/createProblem.dto';
import { CreateProblemResponse } from '../responses/createProblem.response';
import { FindProblemDto } from '../dtos/findProblem.dto';
import { FindProblemResponse } from '../responses/findProblem.response';
import { FindAllProblemDto } from '../dtos/findAllProblem.dto';
import { FindAllProblemResponse, BriefProblemInfo } from '../responses/findAllProblem.response';
import { ProblemEntity } from '../../components/entities/problem.entity';
import { CreateProblemExampleDto } from '../dtos/createProblemExample.dto';
import { ExampleEntity } from '../../components/entities/example.entity';
import { ProblemNotFoundException } from '../exceptions/problemNotFound.exception';
import { TestcaseEntity } from '../../components/entities/testcase.entity';
import { CreateProblemTestcaseDto } from '../dtos/createProblemTestcase.dto';

@Injectable()
export class ManageProblemService {
    constructor(@InjectRepository(ProblemEntity) private __problemsRepository: Repository<ProblemEntity>,
                @InjectRepository(ExampleEntity) private __examplesRepository: Repository<ExampleEntity>,
                @InjectRepository(TestcaseEntity) private __testcasesRepository: Repository<TestcaseEntity>) {}

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

        const INSERTED_PROBLEM_ID:number = (await this.__problemsRepository.manager.save(PROBLEM_TO_INSERT)).id


        return {
            id: INSERTED_PROBLEM_ID
        }
    }

    async find(findProblemDto: FindProblemDto): Promise<FindProblemResponse> {
        const FOUND_PROBLEM_ENTITY:ProblemEntity = await this.__problemsRepository.findOne({
            where: {id: findProblemDto.id}
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

    async findAll(findAllProblemDto: FindAllProblemDto): Promise<FindAllProblemResponse> {
        const ROW_PER_PAGE:number = 50

        
        const FIND_ALL_PROBLEM_RESPONSE = new FindAllProblemResponse()

        const FOUND_PROBLEM_ENTITIES:ProblemEntity[] = await this.__problemsRepository.find({
            select: {
                id: true,
                title: true
            },
            order: {
                id: "ASC"
            },
            skip: ROW_PER_PAGE*(findAllProblemDto.page-1),
            take: ROW_PER_PAGE
        })
        FIND_ALL_PROBLEM_RESPONSE.briefProblemInfos = FOUND_PROBLEM_ENTITIES.map((entity) => {
            return {id: entity.id, title: entity.title}
        })
        return FIND_ALL_PROBLEM_RESPONSE
    }

    
    async createExample(createProblemExampleDto: CreateProblemExampleDto): Promise<void> {    
        // Insert new example data
        const RELATED_PROBLEM:ProblemEntity = await this.__problemsRepository.findOneBy({
            id: createProblemExampleDto.problemId
        })
        if(RELATED_PROBLEM == null) throw new ProblemNotFoundException()

        const EXAMPLE_TO_INSERT:ExampleEntity = new ExampleEntity()
        EXAMPLE_TO_INSERT.inputValue = Buffer.from(createProblemExampleDto.inputValue, "utf-8")
        EXAMPLE_TO_INSERT.outputValue = Buffer.from(createProblemExampleDto.outputValue, "utf-8")
        EXAMPLE_TO_INSERT.problem = RELATED_PROBLEM

        await this.__examplesRepository.manager.save(EXAMPLE_TO_INSERT)
    }

    
    async createTestcase(createProblemTestcaseDto: CreateProblemTestcaseDto): Promise<void> {
        // Inset new testcase data
        const RELATED_PROBLEM:ProblemEntity = await this.__problemsRepository.findOneBy({
            id: createProblemTestcaseDto.problemId
        })
        if(RELATED_PROBLEM == null) throw new ProblemNotFoundException()

        const TESTCASE_TO_INSERT:TestcaseEntity = new TestcaseEntity()
        TESTCASE_TO_INSERT.inputValue = Buffer.from(createProblemTestcaseDto.inputValue, "utf-8")
        TESTCASE_TO_INSERT.outputValue = Buffer.from(createProblemTestcaseDto.outputValue, "utf-8")
        TESTCASE_TO_INSERT.problem = RELATED_PROBLEM

        await this.__testcasesRepository.manager.save(TESTCASE_TO_INSERT)
    }
}
