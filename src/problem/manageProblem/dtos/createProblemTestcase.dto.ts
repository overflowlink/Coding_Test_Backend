import { IsNotEmpty, IsDefined } from 'class-validator';

export class CreateProblemTestcaseDto {
    @IsDefined()
    inputValue: string

    @IsDefined()
    outputValue: string

    @IsNotEmpty()
    problemId: number
}
