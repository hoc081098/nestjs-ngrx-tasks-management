import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class TasksModule {
}
