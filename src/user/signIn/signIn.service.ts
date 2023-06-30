import { Injectable } from '@nestjs/common';

@Injectable()
export class SignInService {
    signIn(): string {
        return "Test: SignIn Service"
    }
}
