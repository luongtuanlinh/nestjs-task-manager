import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  searchByTitleOrDescription(search: string): Task[] {
    return this.tasks.filter(
      (task) =>
        task.title.includes(search) || task.description.includes(search),
    );
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const { title, description, status } = updateTaskDto;
    const task = this.getTaskById(id);
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    return task;
  }

  deleteTaskById(id: string): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    const deletedTask = this.tasks[taskIndex];
    this.tasks.splice(taskIndex, 1);
    return deletedTask;
  }
}
