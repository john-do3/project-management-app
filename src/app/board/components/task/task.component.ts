import {
  Component, Input,
} from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { ITaskUser } from 'src/app/shared/models/taskUserDto';
import { Store } from '@ngrx/store';
import { selectUsers } from 'src/app/redux/selectors/user.selector';
import { map, take } from 'rxjs';
import { TasksService } from '../../../core/services/tasks.service';
import { ITaskState, IUserState } from '../../../redux/state-models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  taskUsers: ITaskUser[] = [];

  usersData$ = this.store.select(selectUsers);

  @Input() task?: ITaskState;

  constructor(
    private readonly store: Store,
    private tasksService: TasksService,
  ) {
    this.usersData$.pipe(
      take(1),
      map((users: IUserState[]) => {
        users.forEach((user) => {
          this.taskUsers.push({
            id: user.id, name: user.name, hash: Md5.hashStr(user.id),
          });
        });
      }),
    ).subscribe();
  }

  public get title() {
    return this.task?.title || '';
  }

  public get description() {
    return this.task?.description || '';
  }

  public destroy() {
    if (this.task) {
      this.tasksService.DeleteTaskClicked.next(this.task);
    }
  }

  public edit() {
    if (this.task) {
      this.tasksService.EditTaskClicked.next(this.task);
    }
  }

  getUserHash(userId?: string): string {
    const result = '';
    const user = this.taskUsers.find((u) => u.id === userId);
    return user ? user.hash : result;
  }

  getUserName(userId?: string): string {
    const result = '';
    const user = this.taskUsers.find((u) => u.id === userId);
    return user ? user.name : result;
  }
}
