import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsValidPassword } from '../validationDecorators/isValidPassword.decorator';

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    userEmail: string;

    @IsValidPassword()
    @IsNotEmpty()
    userPassword: string;
}
