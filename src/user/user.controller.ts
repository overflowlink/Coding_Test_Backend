import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    test(): string {
      return "Test: User Controller"
    }
}
