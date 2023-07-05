import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDto } from './signIn.dto';
import { User } from "../entities/user.entity"
import { Email_Not_Found_Exception } from './exceptions/emailNotFound.exception';

@Injectable()
export class SignInService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async signIn(signInDto: SignInDto): Promise<string> {
        const SIGNIN_USER:User = await this.find_User(signInDto)
        if(SIGNIN_USER == null) throw new Email_Not_Found_Exception()

        return `Test: SignIn Service () > Email : ${SIGNIN_USER.email} / Name : ${SIGNIN_USER.name}`
    }

    async find_User(signInDto: SignInDto): Promise<User | null> {
        return await this.usersRepository.findOneBy({
            email: signInDto.userEmail, 
            password: signInDto.userPassword
        })
    }
}
