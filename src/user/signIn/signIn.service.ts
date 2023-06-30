import { Injectable } from '@nestjs/common';
import { SignInDto } from './signIn.dto';

@Injectable()
export class SignInService {
    signIn(signInDto: SignInDto): string {
        return "Test: SignIn Service ("
                + `userEmail: ${signInDto.userEmail}, `
                + `userPassword: ${signInDto.userPassword}`
                + ")"
    }
}
