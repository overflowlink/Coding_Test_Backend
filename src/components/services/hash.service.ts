import { sha512 } from 'sha512-crypt-ts';
import { Injectable, Inject } from '@nestjs/common';
import { UUIDService } from './uuid.service';

@Injectable()
export class HashService {
    constructor(@Inject(UUIDService) private __uuidService: UUIDService) {}

    sha512(value: string, salt: string): string {        
        return sha512.crypt(value, salt)
    }

    salt(value: string): string {
        return this.__uuidService.uuidv5(value).slice(0, 16)
    }
}
