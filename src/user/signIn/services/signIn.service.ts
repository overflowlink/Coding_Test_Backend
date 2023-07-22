import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../../components/services/auth.service';
import { TokenService } from './token.service';
import { SignInDto } from '../signIn.dto';
import { User } from "../../components/entities/user.entity"
import { EmailNotFoundException } from '../exceptions/emailNotFound.exception';
import { InvalidPasswordException } from '../exceptions/invalidPassword.exception';

@Injectable()
export class SignInService {
    constructor(@InjectRepository(User) private __usersRepository: Repository<User>,
                @Inject(TokenService) private __tokenService: TokenService,
                @Inject(AuthService) private __authService: AuthService) {}

    async signIn(signInDto: SignInDto): Promise<string> {
        const SEARCHED_USER:User = await this.__findUser(signInDto)

        this.__raiseIfEmailNotFound(SEARCHED_USER)
        this.__raiseIfPasswordInvalid(signInDto, SEARCHED_USER)

        return this.__tokenService.token(SEARCHED_USER.email, SEARCHED_USER.name)
    }


    private async __findUser(signInDto: SignInDto): Promise<User | null> {
        return await this.__usersRepository.findOneBy({
            email: signInDto.userEmail
        })
    }


    private __raiseIfEmailNotFound(searchedUser: User): void {
        if(searchedUser == null) throw new EmailNotFoundException()
    }

    private __raiseIfPasswordInvalid(signInDto: SignInDto, searchedUser: User): void {
        if(!this.__authService.isValidPasswordHash(signInDto, searchedUser)) throw new InvalidPasswordException()
    }
}
