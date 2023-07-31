import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashService } from '../../../components/services/hash.service';
import { SignUpDto } from '../dtos/signUp.dto';
import { UserEntity } from "../../components/entities/user.entity"
import { EmailAlreadyExistException } from '../exceptions/emailAlreadyExist.exception';
import { NameAlreadyExistException } from '../exceptions/nameAlreadyExist.exception';

@Injectable()
export class SignUpService {
    constructor(@InjectRepository(UserEntity) private __usersRepository: Repository<UserEntity>,
                @Inject(HashService) private __hashService: HashService) {}


    async signUp(signUpDto: SignUpDto): Promise<void> {
        // Raise if email already exist
        const FOUND_USER_BY_EMAIL_OR_NULL:UserEntity = await this.__usersRepository.findOneBy({
            email: signUpDto.userEmail
        })
        if(FOUND_USER_BY_EMAIL_OR_NULL != null) throw new EmailAlreadyExistException()

        // Raise if name already exist
        const FOUND_USER_BY_NAME_OR_NULL:UserEntity = await this.__usersRepository.findOneBy({
            name: signUpDto.userName
        })
        if(FOUND_USER_BY_NAME_OR_NULL != null) throw new NameAlreadyExistException()


        // Insert new user data
        const USER_TO_INSERT:UserEntity = new UserEntity()
        USER_TO_INSERT.email = signUpDto.userEmail
        USER_TO_INSERT.password = this.__hashService.sha512(signUpDto.userPassword, this.__hashService.salt(signUpDto.userPassword))
        USER_TO_INSERT.name = signUpDto.userName

        await this.__usersRepository.manager.save(USER_TO_INSERT)
    }
}
