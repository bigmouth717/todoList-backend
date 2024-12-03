import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExistedException extends HttpException {
  constructor() {
    super('该用户已存在', HttpStatus.BAD_REQUEST);
  }
}
