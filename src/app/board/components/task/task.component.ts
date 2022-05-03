import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, find, first, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ITaskState } from '../../../redux/state-models';
import { selectTasks } from '../../../redux/selectors/task.selector';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnChanges {
  private tasks$?: Observable<ITaskState[]>;
  private taskSubscription?: Subscription;
  private task?: ITaskState;

  constructor(private store: Store) { }

  @Input() id?: string;
  // @Input() task?: ITaskState;
  @Input() taskIdArray?: string;


  public get title() {return this.task?.title || ''}
  public get description() {return this.task?.description || ''}

  // public isExist = true;

  public destroy () {
    // this.isExist = false;
  }
  ngOnInit(): void {
    this.tasks$ = this.store.select(selectTasks);
    this.taskSubscription = this.tasks$
      .subscribe((tasksArray) => this.task = tasksArray.find((task)=>task.id === this.id))
  }

  ngOnChanges() {
    console.log(this.task, this.title, this.taskIdArray)
  }

}
