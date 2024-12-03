import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  //验证头部header里面的token信息，如果合法就通过，不合法就拒绝
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //1.为了拿到token,首先要通过上下文拿到当前的request
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse();

    //这里加个白名单，让/token不经过这个守卫
    if (['/token', '/task-lists'].includes(request.url)) {
      return true;
    }
    //2.利用request里的authorization获得token及其类型Bearer
    const token = this.extractTokenFromHeader(request);
    console.log('获得的token是' + token);

    //3.利用jwtService的verifyAsync方法来验证token
    const verifyToken = await this.jwtService.verifyAsync(token);
    console.log(verifyToken);

    try {
      verifyToken;
      //   request['user'] = await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('非法token');
    }
    return true;
  }
  private extractTokenFromHeader(request: Request) {
    if (!request.headers.authorization) {
      return '';
    }
    // 这里需要导入express的Request对象，不然系统不知道headers里有authorization。import { Request } from 'express';
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    if (type === 'Bearer') {
      return token;
    } else {
      throw new HttpException('Not Bearer type', HttpStatus.FORBIDDEN);
    }
  }
}
