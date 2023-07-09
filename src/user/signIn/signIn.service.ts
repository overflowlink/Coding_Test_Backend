import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDto } from './signIn.dto';
import { User } from "../entities/user.entity"
import { EmailNotFoundException } from './exceptions/emailNotFound.exception';
import { InvalidPasswordException } from './exceptions/invalidPassword.exception';

@Injectable()
export class SignInService {
    constructor(@InjectRepository(User) private __usersRepository: Repository<User>) {}

    async signIn(signInDto: SignInDto): Promise<void> {
        const SIGNIN_USER:User = await this.__find_User(signInDto)

        this.__raiseIfEmailNotFound(SIGNIN_USER)
        this.__raiseIfPasswordInvalid(signInDto, SIGNIN_USER)
    }


    private async __find_User(signInDto: SignInDto): Promise<User | null> {
        return await this.__usersRepository.findOneBy({
            email: signInDto.userEmail
        })
    }


    private __raiseIfEmailNotFound(signInUser: User): void {
        if(signInUser == null) throw new EmailNotFoundException()
    }

    private __raiseIfPasswordInvalid(signInDto: SignInDto, signInUser: User): void {
        if(signInDto.userPassword != signInUser.password) throw new InvalidPasswordException()
    }
}
