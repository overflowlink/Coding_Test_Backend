import { IsNotEmpty } from 'class-validator';

export class FindAllProblemDto {
    @IsNotEmpty()
    page: number
}
