import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: false })
  locked: boolean;

  @Column({ default: true })
  enabled: boolean;

  @CreateDateColumn()
  createdTime: Date;

  @UpdateDateColumn()
  updatedTime: Date;
  //这里要用多张数据表
  //() => Role:使用函数而不是直接引用类（如Role）的原因是为了确保在编译时，即使类是在不同的文件中定义的，也能正确地解析和引用
  @ManyToMany(() => Role)
  //通常情况下，@JoinTable() 只需要在关系的一个方向上指定，TypeORM 会自动推断出另一个方向的关系。
  @JoinTable({
    name: 'user_roles',
  })
  roles: Role[];

  @Column()
  encryptedPassword: string;
}
