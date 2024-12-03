import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskListDto } from '../dto/create-tasklist.dto';
import { TaskService } from '../service/task.service';

@Controller('task-lists')
export class TaskListController {
  constructor(private taskService: TaskService) {}
  @Post()
  create(@Body() createTaskListDto: CreateTaskListDto) {
    return this.taskService.createTaskList(createTaskListDto);
  }
}
