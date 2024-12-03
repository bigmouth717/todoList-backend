import { Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Base } from './base.entity';

@Entity()
export abstract class Traceable extends Base {
  @ManyToOne(() => User)
  createdBy: User;
  @ManyToOne(() => User)
  updateBy: User;
}
