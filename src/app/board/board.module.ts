import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GravatarModule } from 'ngx-gravatar';
import { TaskComponent } from './components/task/task.component';
import { SharedModule } from '../shared/shared.module';
import { ColumnComponent } from './components/column/column.component';
import { BoardComponent } from './pages/board/board.component';

@NgModule({
  declarations: [
    TaskComponent,
    ColumnComponent,
    BoardComponent,
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
