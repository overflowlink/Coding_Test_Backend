import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ManageProblemService } from './manageProblem/services/manageProblem.service';
import { CreateProblemDto } from './manageProblem/dtos/createProblem.dto';
import { CreateProblemExampleDto } from './manageProblem/dtos/createProblemExample.dto';

@Controller('problem')
export class ProblemController {
  constructor(private __manageProblemService: ManageProblemService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createProblemDto: CreateProblemDto): Promise<object> {
    return {
      id: await this.__manageProblemService.create(createProblemDto)
    }
  }

  @Post("example")
  @HttpCode(200)
  async createExample(@Body() createProblemExampleDto: CreateProblemExampleDto): Promise<void> {
    await this.__manageProblemService.createExample(createProblemExampleDto)
  }
}
