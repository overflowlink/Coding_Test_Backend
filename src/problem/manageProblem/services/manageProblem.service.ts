import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProblemDto } from '../dtos/createProblem.dto';
import { CreateProblemResponse } from '../responses/createProblem.response';
import { FindAllProblemDto } from '../dtos/findAllProblem.dto';
import { FindAllProblemResponse, BriefProblemInfo } from '../responses/findAllProblem.response';
import { ProblemEntity } from '../../components/entities/problem.entity';
import { CreateProblemExampleDto } from '../dtos/createProblemExample.dto';
import { ExampleEntity } from '../../components/entities/example.entity';
import { ProblemNotFoundException } from '../exceptions/problemNotFound.exception';

@Injectable()
export class ManageProblemService {
    constructor(@InjectRepository(ProblemEntity) private __problemsRepository: Repository<ProblemEntity>,
                @InjectRepository(ExampleEntity) private __examplesRepository: Repository<ExampleEntity>) {}

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

    async findAll(findAllProblemDto: FindAllProblemDto): Promise<FindAllProblemResponse> {
        const ROW_PER_PAGE:number = 50

        
        const FIND_ALL_PROBLEM_RESPONSE = new FindAllProblemResponse()

        const FOUND_PROBLEM_EITITIES:ProblemEntity[] = await this.__problemsRepository.find({
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
        FIND_ALL_PROBLEM_RESPONSE.briefProblemInfos = FOUND_PROBLEM_EITITIES.map((entity) => {
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
}
