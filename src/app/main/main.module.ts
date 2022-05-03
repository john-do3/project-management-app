import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardsComponent } from './pages/boards/boards.component';
import { CreateBoardComponent } from './pages/create-board/create-board.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'boards', pathMatch: 'full' },
  { path: 'boards', component: BoardsComponent },
  { path: 'boards/:id', component: BoardsComponent },
];

@NgModule({
  declarations: [
    BoardsComponent,
    CreateBoardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class MainModule { }
