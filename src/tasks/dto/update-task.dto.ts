import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../taskStatus.enum';

export class UpdateTaskDto {
  title: string;
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status value mismatch.',
  })
  status: TaskStatus;
}
