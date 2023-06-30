import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SignInService } from './signIn/signIn.service';
import { SignUpService } from './signUp/signUp.service';

@Module({
  controllers: [UserController],
  providers: [SignInService, SignUpService]
})
export class UserModule {}
