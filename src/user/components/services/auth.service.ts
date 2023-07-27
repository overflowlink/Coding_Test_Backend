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
        let createdPasswordHash:string = ""
        //#region createdPasswordHash(signInDto: SignInDto, searchedUser: User): string
        let searchedUserSalt:string = ""
        //#region searchedUserSalt(searchedUser: User): string
        searchedUserSalt = searchedUser.password.split("$")[2]
        //#endregion

        createdPasswordHash = this.__hashService.sha512(signInDto.userPassword, searchedUserSalt)
        //#endregion
        
        return createdPasswordHash == searchedUser.password
    }
}
