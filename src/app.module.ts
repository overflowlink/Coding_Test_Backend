import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalModule } from './components/modules/global.module';
import { UserModule } from './user/user.module';
import { UserEntity } from "./user/components/entities/user.entity";
import { ProblemModule } from './problem/problem.module';
import { ProblemEntity } from './problem/components/entities/problem.entity';
import { ExampleEntity } from './problem/components/entities/example.entity';

@Module({
  imports: [GlobalModule,

            UserModule,
            ProblemModule,

            ConfigModule.forRoot({envFilePath: ".development.env"}),
            TypeOrmModule.forRoot({
              type: 'mysql',
              host: process.env.DATABASE_HOST,
              port: parseInt(process.env.DATABASE_PORT),
              username: process.env.DATABASE_USER,
              password: process.env.DATABASE_PASSWORD,
              database: process.env.DATABASE_NAME,
              entities: [
                UserEntity,
                ProblemEntity, 
                ExampleEntity
              ],
              synchronize: true,
            })]
})
export class AppModule {}
