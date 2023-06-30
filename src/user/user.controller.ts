import { Controller, Post } from '@nestjs/common';
import { SignInService } from './signIn/signIn.service';
import { SignUpService } from './signUp/signUp.service';

@Controller('user')
export class UserController {
  constructor(private signInService: SignInService,
              private signUpService: SignUpService) {}

  @Post("signIn")
  signIn(): string {
    return this.signInService.signIn()
  }

  @Post("signUp")
  signUp(): string {
    return this.signUpService.signUp()
  }
}
