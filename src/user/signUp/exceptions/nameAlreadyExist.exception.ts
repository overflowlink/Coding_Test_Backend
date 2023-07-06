import { BadRequestException } from '@nestjs/common';

export class NameAlreadyExistException extends BadRequestException
{
    constructor() {
        super("Name already exist exception",
              {"description": "The name used to sign up already exists in the user database\n"
                               + "Please use another valid name to sign up"
        })
    }
}
