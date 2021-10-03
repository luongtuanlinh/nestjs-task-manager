import { IsOptional, IsString } from 'class-validator';

export class FilterTasksDto {
  @IsOptional()
  @IsString()
  search: string;
}
