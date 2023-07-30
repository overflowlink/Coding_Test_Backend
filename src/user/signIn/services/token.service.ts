import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { User } from "../../components/entities/user.entity"

@Injectable()
export class TokenService {
    token(user: User): string {
        const PAYLOAD:object = {
            email: user.email,
            name: user.name
        }
        const SECRET:string = process.env.JWT_SECRET
        const CONFIG:object = {
            expiresIn: process.env.JWT_EXPIRES_IN,
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER
        }

        return jwt.sign(PAYLOAD, SECRET, CONFIG)
    }
}
