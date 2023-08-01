import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsValidPassword } from '../../components/validationDecorators/isValidPassword.decorator';
import { IsValidName } from '../../components/validationDecorators/isValidName.decorator';

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    userEmail: string
    
    @IsValidPassword()
    @IsNotEmpty()
    userPassword: string

    @IsValidName()
    @IsNotEmpty()
    userName: string
}
