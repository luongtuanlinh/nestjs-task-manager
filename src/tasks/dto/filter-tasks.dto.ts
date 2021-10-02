import { IsOptional, NotEquals } from "class-validator";

export class FilterTasksDto {
  @IsOptional()
  search: string;
}
