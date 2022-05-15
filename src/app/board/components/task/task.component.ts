import {
 Component, Input,
} from '@angular/core';
import { ITaskState } from '../../../redux/state-models';
import { TasksService } from '../../../core/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task?: ITaskState;

  constructor(
    private tasksService: TasksService,
              ) {
  }

  public get title() {
    return this.task?.title || '';
  }

  public get description() {
    return this.task?.description || '';
  }

  public destroy() {
    if (this.task){
      this.tasksService.DeleteTaskClicked.next(this.task);
    }
  }

  public edit() {
    if (this.task){
      this.tasksService.EditTaskClicked.next(this.task);
    }
  }
}
