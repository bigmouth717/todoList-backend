import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTokenDto } from '../dto/create-token.dto';
import { UsersService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createToken(createTokenDto: CreateTokenDto): Promise<string> {
    const user = await this.userService.findByUsername(createTokenDto.username);
    console.log(user);

    //1.查看当前用户是否存在与数据库
    if (!user) {
      throw new UnauthorizedException();
    }
    //2.将当前用户的密码与数据库中的密码比对，判断密码是否有效，利用bcrypt的compare方法
    console.log(createTokenDto.password);
    console.log(user.encryptedPassword);

    const isPasswordMatch = await bcrypt.compare(
      createTokenDto.password,
      user.encryptedPassword,
    );
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }
    //3.如果密码有效，使用JWT则生成令牌token并返回

    //3-1:首先写一个带着用户信息的payload
    const payload = { sub: user.id, username: user.username };
    //用signAsync方法去生成token
    return await this.jwtService.signAsync(payload);
  }
}
