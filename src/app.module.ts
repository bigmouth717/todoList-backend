import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'todolist',
      // entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoreModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
