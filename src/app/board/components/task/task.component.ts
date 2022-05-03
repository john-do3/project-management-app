import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITaskState } from '../../../redux/state-models';
import { selectTasks } from '../../../redux/selectors/task.selector';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnChanges {

  constructor(private store: Store) { }

  @Input() task?: ITaskState;

  public get title() {return this.task?.title || ''}

  // public isExist = true;

  public destroy () {
    // this.isExist = false;
  }
  ngOnInit(): void {
console.log(this.task, '777')
  }

  ngOnChanges() {
    console.log(this.task, this.title)
  }

}
