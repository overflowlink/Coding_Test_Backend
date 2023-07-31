import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { SignInService } from './signIn/services/signIn.service';
import { TokenService } from './signIn/services/token.service';
import { SignUpService } from './signUp/services/signUp.service';
import { UserEntity } from "./components/entities/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [SignInService, TokenService, SignUpService]
})
export class UserModule {}
