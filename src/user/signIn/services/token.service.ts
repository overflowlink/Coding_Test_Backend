import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { User } from "../../components/entities/user.entity"

@Injectable()
export class TokenService {
    token(user: User): string {
        return jwt.sign(this.__payload(user), this.__secret(), this.__config())
    }

    private __payload(user: User): object {
        return {
            email: user.email,
            name: user.name
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
