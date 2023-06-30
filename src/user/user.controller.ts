import { Controller, Post } from '@nestjs/common';
import { SignUpService } from './signUp/signUp.service';

@Controller('user')
export class UserController {
  constructor(private signUpService: SignUpService) {}

  @Post("signUp")
  signUp(): string {
    return this.signUpService.signUp()
  }
}
