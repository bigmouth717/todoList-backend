import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../service/user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto.username);
    console.log(process.env.DATABASE_USER);
    this.userService.create(createUserDto);
  }
}
