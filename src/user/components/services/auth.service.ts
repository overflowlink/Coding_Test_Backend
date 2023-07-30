import { Injectable, Inject } from '@nestjs/common';
import { HashService } from '../../../components/services/hash.service';
import { SignUpDto } from '../../signUp/dtos/signUp.dto';
import { SignInDto } from '../../signIn/dtos/signIn.dto';
import { User } from "../entities/user.entity"

@Injectable()
export class AuthService {
    constructor(@Inject(HashService) private __hashService: HashService) {}

    newPasswordHash(signupDto: SignUpDto): string {        
        return this.__hashService.sha512(signupDto.userPassword, this.__hashService.salt(signupDto.userPassword))
    }

    isValidPasswordHash(signInDto: SignInDto, searchedUser: User): boolean {
        let createdPasswordHash:string = ""
        const SEARCHED_USER_SALT:string = searchedUser.password.split("$")[2]
        createdPasswordHash = this.__hashService.sha512(signInDto.userPassword, SEARCHED_USER_SALT)
        
        return createdPasswordHash == searchedUser.password
    }
}
