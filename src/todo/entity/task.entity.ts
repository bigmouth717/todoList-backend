import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TaskStatus } from '../enum/task-status';
import { User } from 'src/core/entity/user.entity';
import { Traceable } from 'src/core/entity/traceable.entity';
import { TaskList } from './task-list.entity';

@Entity()
export class Task extends Traceable {
  @Column()
  name: string;
  @Column({ type: 'enum', default: TaskStatus.TO_DO, enum: TaskStatus })
  status: TaskStatus;
  @ManyToOne(() => User)
  createdBy: User;
  @ManyToOne(() => User)
  updateBy: User;
  @ManyToOne(() => TaskList)
  @JoinColumn({ name: 'taskListId' })
  taskList: TaskList;
}
