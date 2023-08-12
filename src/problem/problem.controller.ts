import { Controller, Get, Query, Param, Post, Body, HttpCode } from '@nestjs/common';

import { ManageProblemService } from './manageProblem/services/manageProblem.service';

import { CreateProblemDto } from './manageProblem/dtos/createProblem.dto';
import { CreateProblemResponse } from './manageProblem/responses/createProblem.response';
import { FindProblemDto } from './manageProblem/dtos/findProblem.dto';
import { FindProblemResponse } from './manageProblem/responses/findProblem.response';
import { FindAllProblemDto } from './manageProblem/dtos/findAllProblem.dto';
import { FindAllProblemResponse } from './manageProblem/responses/findAllProblem.response';

import { CreateProblemExampleDto } from './manageProblem/dtos/createProblemExample.dto';
import { FindProblemExampleDto } from './manageProblem/dtos/findProblemExample.dto';
import { FindProblemExampleResponse } from './manageProblem/responses/findProblemExample.response';

import { CreateProblemTestcaseDto } from './manageProblem/dtos/createProblemTestcase.dto';
import { FindProblemTestcaseDto } from './manageProblem/dtos/findProblemTestcase.dto';
import { FindProblemTestcaseResponse } from './manageProblem/responses/findProblemTestcase.response';


@Controller('problem')
export class ProblemController {
  constructor(private __manageProblemService: ManageProblemService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createProblemDto: CreateProblemDto): Promise<CreateProblemResponse> {
    return (await this.__manageProblemService.create(createProblemDto))
  }

  @Get(':id')
  @HttpCode(200)
  async find(@Param() findProblemDto: FindProblemDto): Promise<FindProblemResponse> {
    return (await this.__manageProblemService.find(findProblemDto))
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

  @Get("example/:problemId")
  @HttpCode(200)
  async findExample(@Param() findProblemExampleDto: FindProblemExampleDto): Promise<FindProblemExampleResponse> {
    return (await this.__manageProblemService.findExample(findProblemExampleDto))
  }


  @Post("testcase")
  @HttpCode(200)
  async createTestcase(@Body() createProblemTestcaseDto: CreateProblemTestcaseDto): Promise<void> {
    await this.__manageProblemService.createTestcase(createProblemTestcaseDto)
  }

  @Get("testcase/:problemId")
  @HttpCode(200)
  async findTestcase(@Param() findProblemTestcaseDto: FindProblemTestcaseDto): Promise<FindProblemTestcaseResponse> {
    return (await this.__manageProblemService.findTestcase(findProblemTestcaseDto))
  }
}
