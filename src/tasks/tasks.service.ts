import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor(private readonly taskRepository: TaskRepository) {}

  getAllTasks(): Task[] {
    throw new NotImplementedException();
  }

  createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOne(id);
    if (task) {
      return task;
    }
    throw new NotFoundException(`Task with ID "${id}" not found`);
  }

  async deleteTaskById(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    throw new NotImplementedException();
  }

  getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    throw new NotImplementedException();
  }
}
