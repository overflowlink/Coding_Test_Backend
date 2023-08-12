import { IsNotEmpty } from 'class-validator';

export class FindProblemTestcaseDto {
    @IsNotEmpty()
    problemId: number
}
