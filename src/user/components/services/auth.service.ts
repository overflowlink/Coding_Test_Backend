import { Injectable, Inject } from '@nestjs/common';
import { HashService } from '../../../components/services/hash.service';
import { SignUpDto } from '../../signUp/signUp.dto';
import { SignInDto } from '../../signIn/signIn.dto';
import { User } from "../entities/user.entity"

@Injectable()
export class AuthService {
    constructor(@Inject(HashService) private __hashService: HashService) {}

    newPasswordHash(signupDto: SignUpDto): string {        
        return this.__hashService.sha512(signupDto.userPassword, this.__hashService.salt(signupDto.userPassword))
    }

    isValidPasswordHash(signInDto: SignInDto, searchedUser: User): boolean {
        return this.__createdPasswordHash(signInDto, searchedUser) == searchedUser.password
    }

    private __createdPasswordHash(signInDto: SignInDto, searchedUser: User): string {
        return this.__hashService.sha512(signInDto.userPassword, this.__salt(searchedUser))
    }

    private __salt(searchedUser: User): string {
        return searchedUser.password.split("$")[2]
    }
}
