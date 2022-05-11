import {
 Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ITaskState } from '../../../redux/state-models';
import { selectTasks } from '../../../redux/selectors/task.selector';
import { deleteTaskData } from '../../../redux/actions/task.actions';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  private tasks$?: Observable<ITaskState[]>;

  private taskSubscription?: Subscription;

  private task?: ITaskState;

  constructor(
    private store: Store,
    private tasksService: TasksService,
              ) {
  }

  @Input() id?: string;

  public get title() {
    return this.task?.title || '';
  }

  public get description() {
    return this.task?.description || '';
  }

  public destroy() {
    if (this.id){
      this.tasksService.openDeleteTaskDialog(this.id)
      // this.store.dispatch(deleteTaskData({ taskId: this.id }));
    }
  }

  public ngOnInit(): void {
    this.tasks$ = this.store.select(selectTasks);
    this.taskSubscription = this.tasks$
      .subscribe((tasksArray) => { this.task = tasksArray.find((task) => task.id === this.id); });
  }

  public ngOnDestroy() {
    this.taskSubscription?.unsubscribe();
  }
}
