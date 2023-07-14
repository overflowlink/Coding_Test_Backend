import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { SignInService } from './signIn/services/signIn.service';
import { AuthService } from './signIn/services/auth.service';
import { SignUpService } from './signUp/services/signUp.service';
import { User } from "./components/entities/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [SignInService, AuthService, SignUpService]
})
export class UserModule {}
