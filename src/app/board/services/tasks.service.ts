import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, Subject } from 'rxjs';
import { HttpErrorService } from '../../core/services/httperror.service';
import { ITaskState } from '../../redux/state-models';
import { kanbanServiceUrl } from '../../project.constants';
import { ICreateTaskDto } from '../../shared/models/createTaskDto';

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
}
