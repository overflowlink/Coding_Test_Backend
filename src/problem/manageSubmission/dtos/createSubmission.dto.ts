import { IsNotEmpty } from 'class-validator';

export class CreateSubmissionDto {
    @IsNotEmpty()
    problemId: number

    @IsNotEmpty()
    language: string

    @IsNotEmpty()
    code: string
}
