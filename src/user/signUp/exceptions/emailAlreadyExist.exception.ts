import { BadRequestException } from '@nestjs/common';

export class EmailAlreadyExistException extends BadRequestException
{
    constructor() {
        super([
            "The email used to sign up already exists in the user database",
            "Please sign in with the used email",
            "Or use another unused email to sign up"
        ], "Email already exist exception")
    }
}
