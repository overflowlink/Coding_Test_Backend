import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { SignInService } from './signIn/signIn.service';
import { SignInDto } from './signIn/signIn.dto';
import { SignUpService } from './signUp/signUp.service';
import { SignUpDto } from './signUp/signUp.dto';

@Controller('user')
export class UserController {
  constructor(private signInService: SignInService,
              private signUpService: SignUpService) {}

  @Post("signIn")
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto): Promise<void> {
    await this.signInService.signIn(signInDto)
  }

  @Post("signUp")
  @HttpCode(200)
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    await this.signUpService.signUp(signUpDto)
  }
}
