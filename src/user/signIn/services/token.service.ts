import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { User } from "../../components/entities/user.entity"

@Injectable()
export class TokenService {
    token(user: User): string {
        let payload:object = null
        //#region payload(user: User): object
        payload = {
            email: user.email,
            name: user.name
        }
        //#endregion

        let secret:string = ""
        //#region secret(): string
        secret = process.env.JWT_SECRET
        //#endregion

        let config:object = null
        //#region config(): object
        config = {
            expiresIn: process.env.JWT_EXPIRES_IN,
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER
        }
        //#endregion

        return jwt.sign(payload, secret, config)
    }
}
