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
        if(SIGNIN_USER == null) throw new EmailNotFoundException()
        if(signInDto.userPassword != SIGNIN_USER.password) throw new InvalidPasswordException()
    }

    private async __find_User(signInDto: SignInDto): Promise<User | null> {
        return await this.__usersRepository.findOneBy({
            email: signInDto.userEmail
        })
    }
}
