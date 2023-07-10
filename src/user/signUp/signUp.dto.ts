import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsValidPassword } from '../validationDecorators/isValidPassword.decorator';
import { IsValidName } from '../validationDecorators/isValidName.decorator';

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    userEmail: string;
    
    @IsValidPassword()
    @IsNotEmpty()
    userPassword: string;

    @IsValidName()
    @IsNotEmpty()
    userName: string;
}
