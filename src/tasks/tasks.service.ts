import { Injectable } from '@nestjs/common';
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
    return this.tasks.find((task) => task.id === id);
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
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    const newTask = {
      ...this.tasks[taskIndex],
      title: title ?? this.tasks[taskIndex].title,
      description: description ?? this.tasks[taskIndex].description,
      status: status ?? this.tasks[taskIndex].status,
    };
    this.tasks[taskIndex] = newTask;
    return newTask;
  }

  deleteTaskById(id: string): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    const deletedTask = this.tasks[taskIndex];
    this.tasks.splice(taskIndex, 1);
    return deletedTask;
  }
}
