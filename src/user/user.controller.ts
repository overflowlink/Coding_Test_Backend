import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { SignInService } from './signIn/services/signIn.service';
import { SignInDto } from './signIn/signIn.dto';
import { SignUpService } from './signUp/services/signUp.service';
import { SignUpDto } from './signUp/signUp.dto';

@Controller('user')
export class UserController {
  constructor(private __signInService: SignInService,
              private __signUpService: SignUpService) {}

  @Post("signIn")
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto): Promise<object> {
    return {
      token: await this.__signInService.signIn(signInDto)
    }
  }

  @Post("signUp")
  @HttpCode(200)
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    await this.__signUpService.signUp(signUpDto)
  }
}
