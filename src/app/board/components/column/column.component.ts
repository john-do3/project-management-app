import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTasks, selectTasksId } from '../../../redux/selectors/task.selector';
import { IColumnState, ITaskState } from '../../../redux/state-models';
import { Observable, of, Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { selectColumnId, selectColumns } from '../../../redux/selectors/column.selector';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
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



  constructor(private store: Store) {
  }

  @Input() column?: IColumnState;

  public get columnId (){
    return this.column ? this.column.id : ''
  }


  public tasks$?: Observable<ITaskState[]>;

  public tasksID$: Observable<string[]> = of(['']);

  public columnsID$: Observable<string[]> | null = of(['']);

  public columnsIdArray = ['']



  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      console.log (event, event.container.data, event.previousIndex, event.currentIndex)
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

  ngOnInit(): void {
    this.tasks$ = this.store.select(selectTasks);
    this.tasksID$ = this.store.select(selectTasksId);
    this.columnsID$ = this.store.select(selectColumnId);

    this.subscriptionTasks = this.store.select(selectTasks)
      .subscribe((val) => {
        console.log(this.columnId, val
          .filter((task) => task.columnId === this.columnId))
        return this.tasksIdArray = val
          .filter((task) => task.columnId === this.columnId)
          .map((val) => val.id);
      })
    // this.subscriptionTasksId = this.store.select(selectTasksId).subscribe((val) => this.tasksIdArray = val)
    this.subscriptionColumnsId = this.store.select(selectColumnId).subscribe((val) => this.columnsIdArray = val)
    console.log(5)
  }
}
