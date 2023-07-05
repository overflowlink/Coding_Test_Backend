import { BadRequestException } from '@nestjs/common';

export class EmailNotFoundException extends BadRequestException
{
    constructor() {
        super("Email not found exception",
              {"description": "The server can't find any valid email using the given email.\n" 
                               + "Please check the email.\n" 
                               + "If you didn't sign up, go to the signUp page."
        })
    }
}