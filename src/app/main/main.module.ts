import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './pages/boards/boards.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'boards', pathMatch: 'full' },
  { path: 'boards', component: BoardsComponent }  
];


@NgModule({
  declarations: [
    BoardsComponent
  ],
  imports: [
    CommonModule,    
    RouterModule.forChild(routes),
  ],  
})
export class MainModule { }
