import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  getTaskById(
    @Param('id') id:string
  ): Task {
    return this.tasksService.getTaskById(id);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id:string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Task {
    return this.tasksService.updateTask(id, updateTaskDto);
  }
}
