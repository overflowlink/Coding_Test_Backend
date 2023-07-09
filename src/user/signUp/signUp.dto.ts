import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    userEmail: string;
    
    @IsNotEmpty()
    userPassword: string;

    @IsNotEmpty()
    userName: string;
}
