import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  catchError, Observable, Subject, tap,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { IColumn } from 'src/app/shared/models/createColumnDto';
import { HttpErrorService } from './httperror.service';
import { ITaskState } from '../../redux/state-models';
import { kanbanServiceUrl } from '../../project.constants';
import { ICreateTaskDto, IUpdateTaskDto } from '../../shared/models/createTaskDto';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public NewTaskClicked: Subject<IColumn> = new Subject<IColumn>();

  public DeleteTaskClicked: Subject<ITaskState> = new Subject<ITaskState>();

  public GetTasksClicked: Subject<ITaskState[]> = new Subject<ITaskState[]>();

  public EditTaskClicked: Subject<ITaskState> = new Subject<ITaskState>();

  constructor(
    private http: HttpClient,
    private httpErrorService: HttpErrorService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router,
    private userService: UserService,
  ) {
  }

  public createTask(boardId: string, columnId: string, newTask: ICreateTaskDto): Observable<ITaskState> {
    console.log(newTask);
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

  public updateTask(boardId: string, columnId: string, taskId: string, task: IUpdateTaskDto): Observable<ITaskState> {
    console.log(task);
    return this.http.put<ITaskState>(`${kanbanServiceUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, task, this.httpOptions)
      .pipe(
        catchError((error) => this.httpErrorService.handleError(error)),
      );
  }

  public loadTasks(boardId: string, columnId: string): Observable<ReadonlyArray<ITaskState>> {
    return this.http.get<ITaskState[]>(`${kanbanServiceUrl}/boards/${boardId}/columns/${columnId}/tasks`, {})
      .pipe(
        catchError((error) => this.httpErrorService.handleError(error)),
      );
  }

  newTaskClick(column: IColumn): void {
    this.NewTaskClicked.next(column);
  }

  /* EditTaskClick():void {
    this.EditTaskClicked.next(true);
  } */
}
