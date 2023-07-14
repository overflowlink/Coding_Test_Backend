import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { SignInService } from './signIn/signIn.service';
import { AuthService } from './signIn/auth.service';
import { SignUpService } from './signUp/signUp.service';
import { User } from "./entities/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [SignInService, AuthService, SignUpService]
})
export class UserModule {}
