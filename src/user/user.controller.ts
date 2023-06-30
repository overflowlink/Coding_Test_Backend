import { Controller, Post, Body } from '@nestjs/common';
import { SignInService } from './signIn/signIn.service';
import { SignUpService } from './signUp/signUp.service';
import { SignUpDto } from './signUp/signUp.dto';

@Controller('user')
export class UserController {
  constructor(private signInService: SignInService,
              private signUpService: SignUpService) {}

  @Post("signIn")
  signIn(): string {
    return this.signInService.signIn()
  }

  @Post("signUp")
  signUp(@Body() signUpDto: SignUpDto): string {
    return this.signUpService.signUp(signUpDto)
  }
}
