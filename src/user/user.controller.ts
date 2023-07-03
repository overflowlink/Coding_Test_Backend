import { Controller, Post, Body } from '@nestjs/common';
import { SignInService } from './signIn/signIn.service';
import { SignInDto } from './signIn/signIn.dto';
import { SignUpService } from './signUp/signUp.service';
import { SignUpDto } from './signUp/signUp.dto';

@Controller('user')
export class UserController {
  constructor(private signInService: SignInService,
              private signUpService: SignUpService) {}

  @Post("signIn")
  signIn(@Body() signInDto: SignInDto): string {
    return this.signInService.signIn(signInDto)
  }

  @Post("signUp")
  async signUp(@Body() signUpDto: SignUpDto): Promise<object> {
    await this.signUpService.signUp(signUpDto)
    return {is_error:false}
  }
}
