import { v1, v5 } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UUIDService {
    uuidv5(value: string): string {        
        return v5(value, v1())
    }
}
