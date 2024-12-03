import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { TaskList } from './entity/task-list.entity';
import { TaskService } from './service/task.service';
import { TaskListController } from './controller/task-list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskList])],
  controllers: [TaskListController],
  providers: [TaskService],
})
export class TodoModule {}
