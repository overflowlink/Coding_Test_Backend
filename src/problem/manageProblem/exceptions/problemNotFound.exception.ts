import { BadRequestException } from '@nestjs/common';

export class ProblemNotFoundException extends BadRequestException
{
    constructor() {
        super([
            "The server can't find any problems with the given problem id",
            "Please check if you wrote a valid problem id"
        ], "Problem not found exception")
    }
}
