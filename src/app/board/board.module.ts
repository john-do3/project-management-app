import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';

@NgModule({
  declarations: [
    TaskComponent,
    CreateTaskComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class BoardModule { }
