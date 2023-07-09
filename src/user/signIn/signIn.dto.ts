import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    userEmail: string;

    @IsNotEmpty()
    userPassword: string;
}
