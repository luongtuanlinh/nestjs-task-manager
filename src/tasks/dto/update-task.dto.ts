import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  title: string;
  description: string;

  @IsEnum(TaskStatus, {
    message: 'Status value mismatch.',
  })
  status: TaskStatus;
}
