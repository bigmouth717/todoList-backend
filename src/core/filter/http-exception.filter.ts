import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
//当前需要捕捉httpexception异常
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  //catch方法里的exception参数就是前面catch装饰器里的httpexception类型
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const code = exception.getStatus();
    const message = exception.message;
    //通过修改response来自定义错误信息
    response.status(code);
    //利用response的json方法去改响应体response
    response.json({
      code: code,
      message: message,
    });
  }
}
