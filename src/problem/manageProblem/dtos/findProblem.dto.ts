import { IsNotEmpty } from 'class-validator';

export class FindProblemDto {
    @IsNotEmpty()
    page: number
}
