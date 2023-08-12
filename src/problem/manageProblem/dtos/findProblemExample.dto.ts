import { IsNotEmpty } from 'class-validator';

export class FindProblemExampleDto {
    @IsNotEmpty()
    problemId: number
}
