import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ColumnComponent } from './components/column/column.component';
import { BoardComponent } from './pages/board/board.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

@NgModule({
  declarations: [
    TaskComponent,
    ColumnComponent,
    BoardComponent,
    CreateTaskComponent,
    EditTaskComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    BoardComponent,
  ],
})
export class BoardModule { }
