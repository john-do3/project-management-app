import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { selectTasks, selectTasksId } from '../../../redux/selectors/task.selector';
import { IColumnState, ITaskState } from '../../../redux/state-models';
import { selectColumnId } from '../../../redux/selectors/column.selector';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  // private subscription?: Subscription;
  //
  // private tasksIdArray: string[] = [];
  private subscriptionColumnsId?: Subscription;

  private subscriptionTasksId?: Subscription;

  public tasksIdArray: string[] = [];

  private subscriptionTasks?: Subscription;

  public tasksArray: ITaskState[] = [];
  public tasksIdArray$?: Observable<string[]>;

  constructor(private store: Store) {
  }

  @Input() column?: IColumnState;

  public get columnId(){
    return this.column ? this.column.id : '';
  }

  public tasks$?: Observable<ITaskState[]>;

  public tasksID$: Observable<string[]> = of(['']);

  public columnsID$: Observable<string[]> | null = of(['']);

  ngOnInit(): void {
    this.tasks$ = this.store.select(selectTasks);
    this.tasksID$ = this.store.select(selectTasksId);
    this.columnsID$ = this.store.select(selectColumnId);


    this.tasksIdArray$ = this.tasks$.pipe(
      // filter((taskArray, i) => taskArray[i].columnId === this.columnId),
      map(([{ id }])=> [id])

    // map((array: ITaskState[])=> array. )
  )
    // this.tasksIdArray$?.subscribe((v)=> console.log(v))

    this.subscriptionTasks = this.store.select(selectTasks)
      .subscribe((val) => {
        console.log(this.columnId, val
          .filter((task) => task.columnId === this.columnId));
        return this.tasksIdArray = val
          .filter((task) => task.columnId === this.columnId)
          .map((taskObj) => taskObj.id);
      });
    // // this.subscriptionTasksId = this.store.select(selectTasksId).subscribe((val) => this.tasksIdArray = val)
    this.subscriptionColumnsId = this.store.select(selectColumnId).subscribe((val) => this.columnsIdArray = val);
    console.log(5);
  }

  public columnsIdArray = [''];

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      console.log(event, event.container.data, event.previousIndex, event.currentIndex, this.tasksIdArray);
      // this.store.dispatch(updateTaskData({
      //   taskId: event.container.data[event.previousIndex],
      //   columnId: event.container.id,
      //   order: event.currentIndex,
      // }));
      // this.store.dispatch(updateTaskData({
      //   taskId: event.container.data[event.currentIndex],
      //   columnId: event.container.id,
      //   order: event.previousIndex,
      // }));
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
