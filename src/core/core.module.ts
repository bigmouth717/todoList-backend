import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersController } from './controller/user.controller';
import { UsersService } from './service/user.service';
import { Role } from './entity/role.entity';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './controller/token.controller';
import { AuthService } from './service/auth.service';
import { SECRET_KEY } from './constant/user';
import { AuthGuard } from './guard/auth.guard';
import { HttpExceptionFilter } from './filter/http-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      global: true,
      //这里的secret是密钥
      secret: SECRET_KEY,
      signOptions: { expiresIn: '6d' },
    }),
  ],
  controllers: [UsersController, TokenController],
  providers: [
    UsersService,
    AuthService,
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter  },
  ],
})
export class CoreModule {}
