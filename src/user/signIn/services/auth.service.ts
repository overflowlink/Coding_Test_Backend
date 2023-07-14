import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
    token(email: string, name: string): string {
        return jwt.sign(this.__payload(email, name), this.__secret(), this.__config())
    }

    private __payload(email: string, name: string): object {
        return {
            email: email,
            name: name
        }
    }

    private __secret(): string {
        return process.env.JWT_SECRET
    }

    private __config(): object {
        return {
            expiresIn: process.env.JWT_EXPIRES_IN,
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER
        }
    }
}
