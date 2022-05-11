import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { HttpErrorService } from '../../core/services/httperror.service';
import { ITaskState } from '../../redux/state-models';
import { boardsRoute, kanbanServiceUrl } from '../../project.constants';
import { ICreateTaskDto } from '../../shared/models/createTaskDto';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import {
  createTaskAction,
  deleteTaskAction,
  deleteTaskData,
  taskActions
} from '../../redux/actions/task.actions';
import { ConfirmModalComponent } from '../../shared/pages/confirm-modal/confirm-modal.component';
import { deleteColumnData } from '../../redux/actions/column.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private httpErrorService: HttpErrorService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router,
  ) {
  }

  public currentBoardId: string = '';
  public currentColumnId: string = '';

  public createTask(boardId: string, columnId: string, newTask: ICreateTaskDto): Observable<ITaskState> {
    console.log(`${kanbanServiceUrl}/boards/${boardId}/columns/${columnId}/tasks`, newTask, this.httpOptions);
    return this.http.post<ITaskState>(`${kanbanServiceUrl}/boards/${boardId}/columns/${columnId}/tasks`, newTask, this.httpOptions)
      .pipe(
        tap((v) => console.log(v)),
        catchError((error) => this.httpErrorService.handleError(error)),
      );
  }

  public deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(`${kanbanServiceUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`)
      .pipe(
        catchError((error) => this.httpErrorService.handleError(error)),
      );
  }

  public loadTasks(boardId: string, columnId: string): Observable<ReadonlyArray<ITaskState>> {
    console.log (boardId, columnId, this.currentColumnId)
    return this.http.get<ITaskState[]>(`${kanbanServiceUrl}/boards/${boardId}/columns/${columnId}/tasks`, {})
      .pipe(
        catchError((error) => this.httpErrorService.handleError(error)),
      );
  }

  public NewTaskClicked: Subject<boolean> = new Subject<boolean>();

  public GetTasksClicked: Subject<ITaskState[]> = new Subject<ITaskState[]>();

  newTaskClick(): void {
    this.NewTaskClicked.next(true);
  }

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '250px',
      data: {title: '', description: ''},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.store.dispatch(createTaskAction({
          boardId: this.currentBoardId,
          columnId: this.currentColumnId,
          description: data.description,
          order: 0,
          done: false,
          title: data.title,
          userId: '520a336d-21d9-4dee-a3fd-1c27e363943c'
        }));
      }
    });
  }

  openDeleteTaskDialog(taskId: string): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    const $ = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.store.dispatch(deleteTaskAction({ boardId: this.currentBoardId, columnId: this.currentColumnId, taskId: taskId }));
        // this.store.dispatch(deleteTaskData({ taskId: taskId }))
        this.router.navigateByUrl(`${boardsRoute}/${this.currentBoardId}`);
      }

      $.unsubscribe();
    });
  }
}
