import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuidV1 from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(private readonly taskRepository: TaskRepository) {}

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidV1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks = [...this.tasks, task];
    return task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      return task;
    }
    throw new NotFoundException(`Task with ID "${id}" not found`);
  }

  deleteTaskById(id: string) {
    this.getTaskById(id);
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = { ...this.getTaskById(id), status };
    this.tasks = this.tasks.map(t => t.id === id ? task : t);
    return task;
  }

  getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    let tasks = this.getAllTasks();
    if (filterDto.status) {
      tasks = tasks.filter(t => t.status === filterDto.status);
    }
    if (filterDto.search) {
      const search = filterDto.search.toLowerCase();
      tasks = tasks.filter(t => {
        return t.title.toLowerCase().includes(search) ||
            t.description.includes(search);
      });
    }
    return tasks;
  }
}
