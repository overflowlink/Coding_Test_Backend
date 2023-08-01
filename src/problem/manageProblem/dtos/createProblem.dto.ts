import { IsNotEmpty, IsDefined } from 'class-validator';

export class CreateProblemDto {
    @IsNotEmpty()
    title: string;


    @IsNotEmpty()
    timeLimitSecond: number;

    @IsNotEmpty()
    memoryLimitMb: number;


    @IsNotEmpty()
    problemExplain: string;

    @IsNotEmpty()
    inputExplain: string;

    @IsNotEmpty()
    outputExplain: string;

    @IsDefined()
    note: string;
}
