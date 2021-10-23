import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './taskStatus.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterTasks: FilterTasksDto): Promise<Task[]> {
    const { search } = filterTasks;
    const query = this.createQueryBuilder('task');
    if (search) {
      query.andWhere('LOWER(task.title) LIKE LOWER(:searchTitle)', { searchTitle: `%${search}%` })
        .orWhere('LOWER(task.description) LIKE LOWER(:searchDescription)', { searchDescription: `%${search}%` })
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = await this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}
