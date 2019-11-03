import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private readonly logger = new Logger('TasksController');

  constructor(private readonly tasksService: TasksService) { }

  @Get()
  getTasks(
      @Query() filterDto: GetTaskFilterDto,
      @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`getTasks filterDto=${JSON.stringify(filterDto)}, username=${user.username}`);
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
      @Param('id', ParseIntPipe) id: number,
      @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`getTaskById id=${id}, username=${user.username}`);
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
      @Body() createTaskDto: CreateTaskDto,
      @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`createTask createTaskDto=${createTaskDto}, username=${user.username}`);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskById(
      @Param('id', ParseIntPipe) id: number,
      @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`deleteTaskById id=${id}, username=${user.username}`);
    return this.tasksService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
      @Param('id', ParseIntPipe)  id: number,
      @Body('status', new TaskStatusValidationPipe())  status: TaskStatus,
      @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`updateTaskStatus id=${id}, status=${status}, username=${user.username}`);
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
