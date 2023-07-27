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
        let searchedUserOrNull:User = null
        //#region findUserOrNull(signInDto: SignInDto): User|null
        searchedUserOrNull = await this.__usersRepository.findOneBy({
            email: signInDto.userEmail
        })
        //#endregion

        //#region raiseIfEmailNotFound(searchedUserOrNull: User): void
        if(searchedUserOrNull == null) throw new EmailNotFoundException()
        //#endregion
        //#region raiseIfPasswordInvalid(signInDto: SignInDto, searchedUserOrNull: User): void
        if(!this.__authService.isValidPasswordHash(signInDto, searchedUserOrNull)) throw new InvalidPasswordException()
        //#endregion

        return this.__tokenService.token(searchedUserOrNull)
    }
}
