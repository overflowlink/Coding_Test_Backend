import { Global, Module } from '@nestjs/common';
import { UUIDService } from '../services/uuid.service';
import { HashService } from '../services/hash.service';

@Global()
@Module({
  providers: [UUIDService, HashService],
  exports: [UUIDService, HashService],
})
export class GlobalModule {}