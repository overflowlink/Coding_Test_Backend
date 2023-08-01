import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashService } from '../../../components/services/hash.service';
import { TokenService } from './token.service';
import { SignInDto } from '../dtos/signIn.dto';
import { UserEntity } from "../../components/entities/user.entity";
import { EmailNotFoundException } from '../exceptions/emailNotFound.exception';
import { InvalidPasswordException } from '../exceptions/invalidPassword.exception';

@Injectable()
export class SignInService {
    constructor(@InjectRepository(UserEntity) private __usersRepository: Repository<UserEntity>,
                @Inject(TokenService) private __tokenService: TokenService,
                @Inject(HashService) private __hashService: HashService) {}


    async signIn(signInDto: SignInDto): Promise<string> {
        // Check If Dto is valid sign in data
        const FOUND_USER_OR_NULL:UserEntity = await this.__usersRepository.findOneBy({
            email: signInDto.userEmail
        })

        // Raise if email is not found
        if(FOUND_USER_OR_NULL == null) throw new EmailNotFoundException()

        // Raise if password is invalid
        let isValidPassword:boolean = false

        let createdPasswordHash:string = ""
        const SEARCHED_USER_SALT:string = FOUND_USER_OR_NULL.password.split("$")[2]
        createdPasswordHash = this.__hashService.sha512(signInDto.userPassword, SEARCHED_USER_SALT)
        isValidPassword = (createdPasswordHash == FOUND_USER_OR_NULL.password)

        if(!isValidPassword) throw new InvalidPasswordException()


        return this.__tokenService.token(FOUND_USER_OR_NULL)
    }
}
