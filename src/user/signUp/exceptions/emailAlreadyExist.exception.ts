import { BadRequestException } from '@nestjs/common';

export class EmailAlreadyExistException extends BadRequestException
{
    constructor() {
        super("Email already exist exception",
              {"description": "The email used to sign up already exists in the user database\n" 
                               + "Please sign in with the used email\n" 
                               + "Or use another unused email to sign up"
        })
    }
}
