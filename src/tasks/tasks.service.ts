import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuidv1 from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const {title, description} = createTaskDto;

    const task: Task = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks = [...this.tasks, task];
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(t => t.id === id);
  }

  deleteTaskById(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = {...this.getTaskById(id), status};
    this.tasks = this.tasks.map(t => t.id === id ? task : t);
    return task;
  }
}
