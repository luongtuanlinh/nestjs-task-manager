import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './taskStatus.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) { }

  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string) {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description, status } = updateTaskDto;
    const task = await this.getTaskById(id);
    console.log(task);
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    this.taskRepository.save(task);
    return task;
  }

  // searchByTitleOrDescription(search: string): Task[] {
  //   return this.tasks.filter(
  //     (task) =>
  //       task.title.includes(search) || task.description.includes(search),
  //   );
  // }
}
