import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProblemEntity } from '../../components/entities/problem.entity';

import { SubmissionEntity } from '../../components/entities/submission.entity';
import { CreateSubmissionDto } from '../dtos/createSubmission.dto';

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
}