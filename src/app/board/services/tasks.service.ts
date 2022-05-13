import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  catchError, Observable, Subject, take, tap,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpErrorService } from '../../core/services/httperror.service';
import { ITaskState, IUserState } from '../../redux/state-models';
import { boardsRoute, kanbanServiceUrl } from '../../project.constants';
import { ICreateTaskDto, IUpdateTaskDto } from '../../shared/models/createTaskDto';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import {
  createTaskAction,
  deleteTaskAction, updateTaskData,
} from '../../redux/actions/task.actions';
import { ConfirmModalComponent } from '../../shared/pages/confirm-modal/confirm-modal.component';
import { deleteColumnData } from '../../redux/actions/column.actions';
import { EditTaskComponent } from '../components/edit-task/edit-task.component';
import { selectUsers } from '../../redux/selectors/user.selector';
import { UserService } from '../../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private userId: string = '';


  constructor(
    private http: HttpClient,
    private httpErrorService: HttpErrorService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router,
    private userService: UserService
  ) {
  }

  private get userLogin() {
    return this.userService.getUserLogin();
  }

  public currentBoardId: string = '';

  public currentColumnId: string = '';

  private usersData$ = this.store.select(selectUsers)

  public createTask(boardId: string, columnId: string, newTask: ICreateTaskDto): Observable<ITaskState> {
    console.log(newTask)
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
    console.log(boardId, columnId, this.currentColumnId);
    return this.http.get<ITaskState[]>(`${kanbanServiceUrl}/boards/${boardId}/columns/${columnId}/tasks`, {})
      .pipe(
        catchError((error) => this.httpErrorService.handleError(error)),
      );
  }

  public NewTaskClicked: Subject<boolean> = new Subject<boolean>();

  public GetTasksClicked: Subject<ITaskState[]> = new Subject<ITaskState[]>();

  public EditTaskClicked: Subject<boolean> = new Subject<boolean>();

  newTaskClick(): void {
    this.NewTaskClicked.next(true);
  }

  EditTaskClick():void {
    this.EditTaskClicked.next(true);
  }

  openCreateTaskDialog(tasks$?: Observable<ITaskState[]>): void {
    const $ = this.usersData$
      .pipe(
        map((val: IUserState[]) => {
          const user = val.find((x) => x.login === this.userLogin);
          if (user) {
            this.userId = user.id

          }
          $.unsubscribe();
        }),
      )
      .subscribe();



    const subs = tasks$?.pipe(
      take(1),
      map((taskArray: ITaskState[]) => {
        const { length } = taskArray;
        const dialogRef = this.dialog.open(CreateTaskComponent, {
          width: '250px',
          data: { title: '', description: '' },
        });

        dialogRef.afterClosed().subscribe((data) => {
          if (data) {
            this.store.dispatch(createTaskAction({
              boardId: this.currentBoardId,
              columnId: this.currentColumnId,
              description: data.description,
              order: length,
              done: false,
              title: data.title,
              userId: this.userId
            }));
          }
        });
      }),
    ).subscribe();

    subs?.unsubscribe();
  }

  openEditTaskDialog(task:ITaskState){
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '250px',
      data: { title: task.title, description: task.description },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.store.dispatch(updateTaskData({
          task: {
            id: task.id,
            boardId: task.boardId,
            columnId: task.columnId,
            description: data.description,
            order: task.order,
            done: task.done,
            title: data.title,
            userId: task.userId
          }
        }));
      }
    });

  }

  openDeleteTaskDialog(taskId: string): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    const $ = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.store.dispatch(deleteTaskAction({ boardId: this.currentBoardId, columnId: this.currentColumnId, taskId }));
        this.router.navigateByUrl(`${boardsRoute}/${this.currentBoardId}`);
      }

      $.unsubscribe();
    });
  }
}
