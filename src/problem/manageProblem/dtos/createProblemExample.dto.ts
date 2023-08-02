import { IsNotEmpty, IsDefined } from 'class-validator';

export class CreateProblemExampleDto {
    @IsDefined()
    inputValue: string

    @IsDefined()
    outputValue: string

    @IsNotEmpty()
    problemId: number
}
