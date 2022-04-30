import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class BoardModule { }
