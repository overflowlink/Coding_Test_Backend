import { BadRequestException } from '@nestjs/common';

export class EmailNotFoundException extends BadRequestException
{
    constructor() {
        super([
            "The server can't find any valid email using the given email",
            "Please check the email",
            "If you didn't sign up, go to the sign up page"
        ], "Email not found exception")
    }
}
