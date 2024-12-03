import { IsNotEmpty } from 'class-validator';

export class CreateTokenDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
