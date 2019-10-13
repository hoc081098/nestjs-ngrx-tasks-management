import { Brackets, EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

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
