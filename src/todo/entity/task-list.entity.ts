import { Traceable } from 'src/core/entity/traceable.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { TaskListStatus } from '../enum/task-list-status';
import { Task } from './task.entity';

@Entity()
export class TaskList extends Traceable {
  @Column()
  name: string;
  @Column({
    type: 'enum',
    enum: TaskListStatus,
    default: TaskListStatus.ACTIVE,
  })
  status: TaskListStatus;
  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];
}
