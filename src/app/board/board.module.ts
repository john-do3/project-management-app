import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskComponent } from '../main/pages/create-task/create-task.component';
import { ColumnComponent } from './components/column/column.component';
import { BoardComponent } from './pages/board/board.component';
import { GravatarModule } from 'ngx-gravatar';

@NgModule({
  declarations: [
    TaskComponent,
    ColumnComponent,
    BoardComponent,
    CreateTaskComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    GravatarModule,
  ],
  exports: [
    BoardComponent,
  ],
})
export class BoardModule { }
