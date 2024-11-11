import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../service/user.service';

@Controller('users')
export class UsersController {
  constructor(userService: UsersService) {}
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto.name);
    console.log(process.env.DATABASE_USER);
  }
}
