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
        await this.__raiseIfEmailExist(signUpDto)
        await this.__raiseIfNameExist(signUpDto)
        
        await this.__insertUser(signUpDto)
    }


    private async __raiseIfEmailExist(signUpDto: SignUpDto): Promise<void> {
        if((await this.__findUserByEmail(signUpDto)) != null) throw new EmailAlreadyExistException()
    }

    private async __findUserByEmail(signUpDto: SignUpDto): Promise<User | null> {
        return await this.__usersRepository.findOneBy({
            email: signUpDto.userEmail
        })
    }


    private async __raiseIfNameExist(signUpDto: SignUpDto): Promise<void> {
        if((await this.__findUserByName(signUpDto)) != null) throw new NameAlreadyExistException()
    }

    private async __findUserByName(signUpDto: SignUpDto): Promise<User | null> {
        return await this.__usersRepository.findOneBy({
            name: signUpDto.userName
        })
    }

    
    private async __insertUser(signUpDto: SignUpDto): Promise<void> {
        await this.__usersRepository.manager.save(this.__user(signUpDto))
    }

    private __user(signUpDto: SignUpDto): User {
        const USER = new User()
        USER.email = signUpDto.userEmail
        USER.password = this.__authService.newPasswordHash(signUpDto)
        USER.name = signUpDto.userName
        return USER
    }
}
