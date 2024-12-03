import {
  HttpException,
  HttpStatus,
  Injectable,
  Response,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserExistedException } from '../exception/user-existed.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  //在数据库里查找是否有该用户名
  async findByUsername(username: string): Promise<any> {
    //这里的findoneby的方法里，name是来自userEntity里的属性，username来自findByUsername方法的参数
    const user = await this.usersRepository.findOneBy({ name: username });
    return user;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    if (this.findByUsername(createUserDto.username)) {
      throw new UserExistedException();
    }
    const user = new User();
    user.name = createUserDto.username;
    //用bcrypt加密明文密码
    const salt = await bcrypt.genSalt(10);
    user.encryptedPassword = await bcrypt.hash(createUserDto.password, salt);
    console.log(user.encryptedPassword);

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
