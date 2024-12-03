import { Injectable } from '@nestjs/common';
import { CreateTaskListDto } from '../dto/create-tasklist.dto';
import { TaskList } from '../entity/task-list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepositry: Repository<TaskList>,
  ) {}
  async createTaskList(
    createTaskListDto: CreateTaskListDto,
  ): Promise<TaskList> {
    const taskList = new TaskList();
    taskList.name = createTaskListDto.name;
    return  this.taskListRepositry.save(taskList);
  }
}
