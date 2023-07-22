import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AuthService } from './components/services/auth.service';
import { SignInService } from './signIn/services/signIn.service';
import { TokenService } from './signIn/services/token.service';
import { SignUpService } from './signUp/services/signUp.service';
import { User } from "./components/entities/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [AuthService, SignInService, TokenService, SignUpService]
})
export class UserModule {}
