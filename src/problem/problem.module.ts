import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemController } from './problem.controller';

import { ManageProblemService } from './manageProblem/services/manageProblem.service';
import { ProblemEntity } from './components/entities/problem.entity';
import { ExampleEntity } from './components/entities/example.entity';
import { TestcaseEntity } from './components/entities/testcase.entity';

import { ManageSubmissionService } from './manageSubmission/services/manageSubmission.service';
import { SubmissionEntity } from './components/entities/submission.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ProblemEntity, ExampleEntity, TestcaseEntity, SubmissionEntity])],
  controllers: [ProblemController],
  providers: [ManageProblemService, ManageSubmissionService]
})
export class ProblemModule {}
