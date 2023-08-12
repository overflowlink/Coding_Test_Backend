import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemController } from './problem.controller';

import { ManageProblemService } from './manageProblem/services/manageProblem.service';
import { ProblemEntity } from './components/entities/problem.entity';
import { ExampleEntity } from './components/entities/example.entity';
import { TestcaseEntity } from './components/entities/testcase.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ProblemEntity, ExampleEntity, TestcaseEntity])],
  controllers: [ProblemController],
  providers: [ManageProblemService]
})
export class ProblemModule {}
