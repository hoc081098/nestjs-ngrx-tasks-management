import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

const dbConfig = config.get('db');

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: process.env.RDS_HOSTNAME || dbConfig.host,
      port: process.env.RDS_PORT || dbConfig.port,
      username: process.env.RDS_USERNAME || dbConfig.username,
      password: process.env.RDS_PASSWORD || dbConfig.password,
      database: process.env.RDS_DB_NAME || dbConfig.database,
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
