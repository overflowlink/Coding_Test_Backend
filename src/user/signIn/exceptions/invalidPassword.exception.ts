import { BadRequestException } from '@nestjs/common';

export class InvalidPasswordException extends BadRequestException
{
    constructor() {
        super("Invalid password exception",
              {"description": "Given password is not valid for email." 
                               + " Please check if you correctly entered the password." 
        })
    }
}
