import { Body, Controller, Post } from '@nestjs/common';
import { CreateTokenDto } from '../dto/create-token.dto';
import { AuthService } from '../service/auth.service';

@Controller('token')
export class TokenController {
  constructor(private authService: AuthService) {}
  @Post()
  async create(@Body() createTokenDto: CreateTokenDto) {
    return this.authService.createToken(createTokenDto);
  }
}
