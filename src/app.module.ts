import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
      TasksModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '12345678',
        database: 'task_management',
        entities: [join(__dirname, '**/*.entity{.ts,.js}')],
        synchronize: true,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
