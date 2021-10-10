import { IsEnum } from 'class-validator';
import { TaskStatus } from '../taskStatus.enum';

export class UpdateTaskDto {
  title: string;
  description: string;

  @IsEnum(TaskStatus, {
    message: 'Status value mismatch.',
  })
  status: TaskStatus;
}
