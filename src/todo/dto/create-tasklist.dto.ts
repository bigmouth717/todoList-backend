import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTaskListDto {
  @IsNotEmpty({
    message: '任务列表名称不能为空',
  })
  @MinLength(2, {
    message: '任务列表名称不能少于2个字符',
  })
  @MaxLength(20, {
    message: '任务列表名称不能多于20个字符',
  })
  name: string;
}
