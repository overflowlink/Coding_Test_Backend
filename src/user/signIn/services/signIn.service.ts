import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../../components/services/auth.service';
import { TokenService } from './token.service';
import { SignInDto } from '../dtos/signIn.dto';
import { User } from "../../components/entities/user.entity"
import { EmailNotFoundException } from '../exceptions/emailNotFound.exception';
import { InvalidPasswordException } from '../exceptions/invalidPassword.exception';

@Injectable()
export class SignInService {
    constructor(@InjectRepository(User) private __usersRepository: Repository<User>,
                @Inject(TokenService) private __tokenService: TokenService,
                @Inject(AuthService) private __authService: AuthService) {}


    async signIn(signInDto: SignInDto): Promise<string> {
        // Check If Dto is valid sign in data
        const FOUND_USER_OR_NULL:User = await this.__usersRepository.findOneBy({
            email: signInDto.userEmail
        })

        // Raise if email is not found
        if(FOUND_USER_OR_NULL == null) throw new EmailNotFoundException()

        // Raise if password is invalid
        if(!this.__authService.isValidPasswordHash(signInDto, FOUND_USER_OR_NULL)) throw new InvalidPasswordException()


        return this.__tokenService.token(FOUND_USER_OR_NULL)
    }
}
