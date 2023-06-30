import { Injectable } from '@nestjs/common';

@Injectable()
export class SignUpService {
    signUp(): string {
        return "Test: SignUp Service"
    }
}
