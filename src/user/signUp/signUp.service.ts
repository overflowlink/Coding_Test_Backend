import { Injectable } from '@nestjs/common';
import { SignUpDto } from './signUp.dto';

@Injectable()
export class SignUpService {
    signUp(signUpDto: SignUpDto): string {
        return "Test: SignUp Service ("
                + `userEmail: ${signUpDto.userEmail}, `
                + `userName: ${signUpDto.userName}, `
                + `userPassword: ${signUpDto.userPassword}`
                + ")"
    }
}
