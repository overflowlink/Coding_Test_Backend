import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { SignInDto } from '../signIn.dto';
import { User } from "../../components/entities/user.entity"
import { EmailNotFoundException } from '../exceptions/emailNotFound.exception';
import { InvalidPasswordException } from '../exceptions/invalidPassword.exception';

@Injectable()
export class SignInService {
    constructor(@InjectRepository(User) private __usersRepository: Repository<User>,
                @Inject(AuthService) private __authService: AuthService) {}

    async signIn(signInDto: SignInDto): Promise<string> {
        const SIGNIN_USER:User = await this.__find_User(signInDto)

        this.__raiseIfEmailNotFound(SIGNIN_USER)
        this.__raiseIfPasswordInvalid(signInDto, SIGNIN_USER)

        return this.__authService.token(SIGNIN_USER.email, SIGNIN_USER.name)
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
