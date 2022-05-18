import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { HttpErrorService } from '../../core/services/httperror.service';
import { ITaskState } from '../../redux/state-models';
import { kanbanServiceUrl } from '../../project.constants';
import { ICreateTaskDto } from '../../shared/models/createTaskDto';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { addTaskAction } from '../../redux/actions/add-task.action';

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
  ) {}

  public createTask(newTask: ICreateTaskDto): Observable<ITaskState> {
    return this.http.post<ITaskState>(`${kanbanServiceUrl}/tasks`, newTask, this.httpOptions)
      .pipe(
        catchError((error) => this.httpErrorService.handleError(error)),
      );
  }

  public deleteTask(taskId: string) {
    return this.http.delete(`${kanbanServiceUrl}/tasks/${taskId}`)
      .pipe(
        catchError((error) => this.httpErrorService.handleError(error)),
      );
  }

  public loadTasks(): Observable<ReadonlyArray<ITaskState>> {
    return this.http.get<ITaskState[]>(`${kanbanServiceUrl}/tasks`, {})
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
      data: { title: '', description: '' },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) this.store.dispatch(addTaskAction({ task: data }));
    });
  }
}
