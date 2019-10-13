import { TaskStatus } from '../task-status.enum';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
