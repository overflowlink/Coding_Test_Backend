import { IsNotEmpty } from 'class-validator';

export class FindSubmissionDto {
    @IsNotEmpty()
    page: number
}
