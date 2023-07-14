import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from "./user/components/entities/user.entity"

@Module({
  imports: [UserModule,
            ConfigModule.forRoot({envFilePath: ".development.env"}),
            TypeOrmModule.forRoot({
              type: 'mysql',
              host: process.env.DATABASE_HOST,
              port: parseInt(process.env.DATABASE_PORT),
              username: process.env.DATABASE_USER,
              password: process.env.DATABASE_PASSWORD,
              database: process.env.DATABASE_NAME,
              entities: [User],
              synchronize: true,
            })]
})
export class AppModule {}
