import { IsNotEmpty } from 'class-validator';

export class FindOneProblemDto {
    @IsNotEmpty()
    id: number
}
