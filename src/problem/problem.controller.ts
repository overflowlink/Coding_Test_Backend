import { Controller, Get, Query, Post, Body, HttpCode } from '@nestjs/common';
import { ManageProblemService } from './manageProblem/services/manageProblem.service';
import { CreateProblemDto } from './manageProblem/dtos/createProblem.dto';
import { CreateProblemResponse } from './manageProblem/responses/createProblem.response';
import { FindAllProblemDto } from './manageProblem/dtos/findAllProblem.dto';
import { FindAllProblemResponse } from './manageProblem/responses/findAllProblem.response';
import { CreateProblemExampleDto } from './manageProblem/dtos/createProblemExample.dto';

@Controller('problem')
export class ProblemController {
  constructor(private __manageProblemService: ManageProblemService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createProblemDto: CreateProblemDto): Promise<CreateProblemResponse> {
    return (await this.__manageProblemService.create(createProblemDto))
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query() findAllProblemDto: FindAllProblemDto): Promise<FindAllProblemResponse> {
    return (await this.__manageProblemService.findAll(findAllProblemDto))
  }


  @Post("example")
  @HttpCode(200)
  async createExample(@Body() createProblemExampleDto: CreateProblemExampleDto): Promise<void> {
    await this.__manageProblemService.createExample(createProblemExampleDto)
  }
}
