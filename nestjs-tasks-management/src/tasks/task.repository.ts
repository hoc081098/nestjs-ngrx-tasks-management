import { Logger } from '@nestjs/common';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private readonly logger = new Logger('TaskRepository');

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    try {
      await task.save();
    } catch (e) {
      this.logger.error(`Error createTask: createTaskDto=${JSON.stringify(createTaskDto)}, username=${user.username}`, e.stack);
      throw e;
    }

    delete task.user;
    return task;
  }

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;
    const queryBuilder = this.createQueryBuilder('t');

    queryBuilder.where('t.userId = :userId', { userId: user.id });

    if (status) {
      queryBuilder.andWhere('t.status = :status', { status });
    }
    if (search) {
      queryBuilder.andWhere(
          new Brackets(qb => {
            const parameters = { search: `%${search}%` };
            qb.where('t.title LIKE :search', parameters)
                .orWhere('t.description LIKE :search', parameters);
          }),
      );
    }

    try {
      return await queryBuilder.getMany();
    } catch (e) {
      this.logger.error(`Error getTasks: filterDto=${JSON.stringify(filterDto)}, username=${user.username}`, e.stack);
      throw e;
    }
  }
}
