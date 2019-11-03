import { Brackets, EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;
    return task;
  }

  getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    const queryBuilder = this.createQueryBuilder('t');

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

    return queryBuilder.getMany();
  }
}
