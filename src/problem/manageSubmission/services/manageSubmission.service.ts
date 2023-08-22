import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProblemEntity } from '../../components/entities/problem.entity';

import { SubmissionEntity } from '../../components/entities/submission.entity';
import { CreateSubmissionDto } from '../dtos/createSubmission.dto';
import { FindSubmissionDto } from '../dtos/findSubmission.dto';
import { FindSubmissionResponse } from '../responses/findSubmission.response';

import { ProblemNotFoundException } from '../../manageProblem/exceptions/problemNotFound.exception';


@Injectable()
export class ManageSubmissionService {
    constructor(@InjectRepository(ProblemEntity) private __problemRepository: Repository<ProblemEntity>,
                @InjectRepository(SubmissionEntity) private __submissionRepository: Repository<SubmissionEntity>) {}

    async create(createSubmissionDto: CreateSubmissionDto): Promise<void> {
        // Insert new submission data
        const RELATED_PROBLEM:ProblemEntity = await this.__problemRepository.findOneBy({
            id: createSubmissionDto.problemId
        })
        if(RELATED_PROBLEM == null) throw new ProblemNotFoundException()

        const SUBMISSION_TO_INSERT:SubmissionEntity = new SubmissionEntity()
        SUBMISSION_TO_INSERT.problem = RELATED_PROBLEM
        SUBMISSION_TO_INSERT.code = Buffer.from(createSubmissionDto.code, "utf-8")
        SUBMISSION_TO_INSERT.language = createSubmissionDto.language
        SUBMISSION_TO_INSERT.verdict = "Marking"

        this.__submissionRepository.save(SUBMISSION_TO_INSERT)
    }

    async find(findSubmissionDto: FindSubmissionDto): Promise<FindSubmissionResponse> {
        const ROW_PER_PAGE:number = 50


        const FIND_SUBMISSION_RESPONSE = new FindSubmissionResponse()
        
        const FOUND_SUBMISSION_ENTITIES:SubmissionEntity[] = await this.__submissionRepository.find({
            order: {
                id: "ASC"
            },
            skip: ROW_PER_PAGE*(findSubmissionDto.page-1),
            take: ROW_PER_PAGE,
            relations: ["problem"]
        })
        FIND_SUBMISSION_RESPONSE.submissionInfos = FOUND_SUBMISSION_ENTITIES.map((entity) => {
            return {
                id: entity.id,
                timeSecond: entity.timeSecond, memoryMb: entity.memoryMb, verdict: entity.verdict,
                language: entity.language, code: entity.code.toString(),
                sentAt: entity.sentAt, judgedAt: entity.judgedAt,
                problemId: entity.problem.id
            }
        })
        return FIND_SUBMISSION_RESPONSE
    }
}