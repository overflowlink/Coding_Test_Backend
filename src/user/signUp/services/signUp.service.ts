import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../../components/services/auth.service';
import { SignUpDto } from '../signUp.dto';
import { User } from "../../components/entities/user.entity"
import { EmailAlreadyExistException } from '../exceptions/emailAlreadyExist.exception';
import { NameAlreadyExistException } from '../exceptions/nameAlreadyExist.exception';

@Injectable()
export class SignUpService {
    constructor(@InjectRepository(User) private __usersRepository: Repository<User>,
                @Inject(AuthService) private __authService: AuthService) {}


    async signUp(signUpDto: SignUpDto): Promise<void> {
        //#region raiseIfEmailAlreadyExist(signUpDto: SignUpDto): void
        let findedUserByEmailOrNull:User = null
        //#region findUserByEmailOrNull(signUpDto: SignUpDto): User|null
        findedUserByEmailOrNull = await this.__usersRepository.findOneBy({
            email: signUpDto.userEmail
        })
        //#endregion

        if(findedUserByEmailOrNull != null) throw new EmailAlreadyExistException()
        //#endregion
        //#region raiseIfNameAlreadyExist(signUpDto: SignUpDto): void
        let findedUserByNameOrNull:User = null
        //#region findUserByNameOrNull(signUpDto: SignUpDto): User|null
        findedUserByNameOrNull = await this.__usersRepository.findOneBy({
            name: signUpDto.userName
        })
        //#endregion

        if(findedUserByNameOrNull != null) throw new NameAlreadyExistException()
        //#endregion

        //#region insertUser(signUpDto: SignUpDto): void
        let userToInsert:User = null
        //#region userToInsert(signUpDto: SignUpDto): User
        userToInsert = new User()
        userToInsert.email = signUpDto.userEmail
        userToInsert.password = this.__authService.newPasswordHash(signUpDto)
        userToInsert.name = signUpDto.userName
        //#endregion

        await this.__usersRepository.manager.save(userToInsert)
        //#endregion
    }
}
