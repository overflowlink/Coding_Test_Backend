import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsValidPassword } from '../components/validationDecorators/isValidPassword.decorator';

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    userEmail: string;

    @IsValidPassword()
    @IsNotEmpty()
    userPassword: string;
}
