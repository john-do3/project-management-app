import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BoardsComponent } from './pages/boards/boards.component';
import { CreateBoardComponent } from './pages/create-board/create-board.component';
import { SharedModule } from '../shared/shared.module';
import { CreateColumnComponent } from './pages/create-column/create-column.component';
import { BoardModule } from '../board/board.module';
import { CreateTaskComponent } from './pages/create-task/create-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'boards', pathMatch: 'full' },
  { path: 'boards', component: BoardsComponent },
  { path: 'boards/:id', component: BoardsComponent },
];

@NgModule({
  declarations: [
    BoardsComponent,
    CreateBoardComponent,
    CreateColumnComponent,
    CreateTaskComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    EditorModule,
    BoardModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class MainModule {}
