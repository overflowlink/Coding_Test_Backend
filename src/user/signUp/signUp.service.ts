import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './signUp.dto';
import { User } from "../entities/user.entity"
import { EmailAlreadyExistException } from './exceptions/emailAlreadyExist.exception';

@Injectable()
export class SignUpService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async signUp(signUpDto: SignUpDto): Promise<void> {
        if((await this.find_User(signUpDto)) != null) throw new EmailAlreadyExistException()
        
        await this.insert_User(signUpDto)
    }

    async find_User(signUpDto: SignUpDto): Promise<User | null> {
        return await this.usersRepository.findOneBy({
            email: signUpDto.userEmail
        })
    }

    async insert_User(signUpDto: SignUpDto): Promise<void> {
        await this.usersRepository.manager.save(this.user(signUpDto))
    }

    user(signUpDto: SignUpDto): User {
        const USER = new User()
        USER.email = signUpDto.userEmail
        USER.password = signUpDto.userPassword
        USER.name = signUpDto.userName
        return USER
    }
}
