import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProblemDto } from '../dtos/createProblem.dto';
import { ProblemEntity } from '../../components/entities/problem.entity';

@Injectable()
export class ManageProblemService {
    constructor(@InjectRepository(ProblemEntity) private __problemsRepository: Repository<ProblemEntity>) {}

    async create(createProblemDto: CreateProblemDto): Promise<number> {
        // Insert new problem data
        const PROBLEM_TO_INSERT:ProblemEntity = new ProblemEntity()
        PROBLEM_TO_INSERT.title = createProblemDto.title

        PROBLEM_TO_INSERT.timeLimitSecond = createProblemDto.timeLimitSecond
        PROBLEM_TO_INSERT.memoryLimitMb = createProblemDto.memoryLimitMb
        
        PROBLEM_TO_INSERT.problemExplain = Buffer.from(createProblemDto.problemExplain, "utf-8")
        PROBLEM_TO_INSERT.inputExplain = Buffer.from(createProblemDto.inputExplain, "utf-8")
        PROBLEM_TO_INSERT.outputExplain = Buffer.from(createProblemDto.outputExplain, "utf-8")
        PROBLEM_TO_INSERT.note = Buffer.from(createProblemDto.note, "utf-8")


        return (await this.__problemsRepository.manager.save(PROBLEM_TO_INSERT)).id
    }
}
