import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITaskState } from '../../../redux/state-models';
import { selectTasks } from '../../../redux/selectors/task.selector';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private store: Store) { }

  @Input() task?: ITaskState;

  public isExist = true;

  public destroy () {
    this.isExist = false;
  }
  ngOnInit(): void {

  }

}
