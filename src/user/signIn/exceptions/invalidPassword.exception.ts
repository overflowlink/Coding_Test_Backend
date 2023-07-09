import { BadRequestException } from '@nestjs/common';

export class InvalidPasswordException extends BadRequestException
{
    constructor() {
        super([
            "Given password is not valid for email",
            "Please check if you correctly entered the password"
        ], "Invalid password exception")
    }
}
