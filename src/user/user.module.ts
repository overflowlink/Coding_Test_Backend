import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SignUpService } from './signUp/signUp.service';

@Module({
  controllers: [UserController],
  providers: [SignUpService]
})
export class UserModule {}
