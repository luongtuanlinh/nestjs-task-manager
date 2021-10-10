import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks(@Query() filterTasks: FilterTasksDto): Task[] {
  //   if (Object.keys(filterTasks).length) {
  //     return this.tasksService.searchByTitleOrDescription(filterTasks.search);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Get(':id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Patch(':id')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body() updateTaskDto: UpdateTaskDto,
  // ): Task {
  //   return this.tasksService.updateTask(id, updateTaskDto);
  // }

  // @Delete(':id')
  // deleteTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.deleteTaskById(id);
  // }
}
