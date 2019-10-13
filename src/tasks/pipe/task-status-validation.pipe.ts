import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      throw new BadRequestException(`${value} is an invalid task status`);
    }

    const upperCase = value.toUpperCase();
    if (!Object.values(TaskStatus as any).includes(upperCase)) {
      throw new BadRequestException(`${value} is an invalid task status`);
    }
  }
}
