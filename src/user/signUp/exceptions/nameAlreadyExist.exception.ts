import { BadRequestException } from '@nestjs/common';

export class NameAlreadyExistException extends BadRequestException
{
    constructor() {
        super([
            "The name used to sign up already exists in the user database",
            "Please use another valid name to sign up"
        ], "Name already exist exception")
    }
}
