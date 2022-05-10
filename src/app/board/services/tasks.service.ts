import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { HttpErrorService } from '../../core/services/httperror.service';
import { ITaskState } from '../../redux/state-models';
import { kanbanServiceUrl } from '../../project.constants';
import { ICreateTaskDto } from '../../shared/models/createTaskDto';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { createTaskAction, taskActions } from '../../redux/actions/task.actions';

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
  ) {
  }

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
          boardId: '823cb8a6-7e24-42bb-aa1c-a092829221e4',
          columnId: '16cf362b-3e4f-4945-9711-7fbde2682414',
          description: data.description,
          order: 0,
          title: data.title,
          userId: '8de1297f-3d53-433b-b5af-3bfa0397dde3'
        }));
      }
    });
  }
}
