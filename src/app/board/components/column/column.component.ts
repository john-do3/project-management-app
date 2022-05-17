import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, Subscription, take, } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';
import { HeaderService } from 'src/app/core/services/header.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { selectTasks } from '../../../redux/selectors/task.selector';
import { IColumnState, ITaskState } from '../../../redux/state-models';
import { selectColumnId } from '../../../redux/selectors/column.selector';
import * as TaskActions from '../../../redux/actions/task.actions';
import { BoardService } from '../../../core/services/board.service';
import { updateColumn } from '../../../redux/actions/column.actions';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit, OnDestroy {
  isTitleEditing = false;

  @Input() boardId!: string;

  @Input() column?: IColumnState;

  @Input() columnId!: string;

  @ViewChild('columnTitle')
  inputTitle!: ElementRef;

  private subscriptions = new Subscription();

  constructor(
    private headerService: HeaderService,
    private readonly store: Store,
    private tasksService: TasksService,
    private boardService: BoardService,
  ) {
  }

  // public tasks$: Observable<ITaskState[]> = of (['']);
  public tasks$ = this.store.select(selectTasks).pipe(
    map((value) => value.filter((val) => val.boardId === this.boardId && val.columnId === this.columnId)),
  );

  public tasksID$ = this.tasks$.pipe(
    map(([...taskArray]) => {
      return [...taskArray].map((task) => task.id);
    }));


  public columnsID$: Observable<string[]> = of(['']);

  onNewTaskClick(): void {
    this.tasksService.newTaskClick({boardId: this.boardId, columnId: this.columnId});
  }

  onDeleteColumnClick(columnId?: string): void {
    if (columnId) this.boardService.DeleteColumnClicked.next(columnId);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasksAction({boardId: this.boardId, columnId: this.columnId}));

    // this.tasks$ = this.store.select(selectTasks).pipe(
    //   map((value) => value.filter((val) => val.boardId === this.boardId && val.columnId === this.columnId)),
    // );

    // this.tasksID$ = this.store.select(selectTasksId);
    this.columnsID$ = this.store.select(selectColumnId);
  }

  public columnsIdArray = [''];

  drop(event: CdkDragDrop<any>): void {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const arr = <ITaskState[]>(event.container.data).map((task: ITaskState, i:number) => {

        const taskObject: ITaskState = {
          id: task.id,
          title: task.title,
          done: task.done,
          order: i,
          description: task.description,
          boardId: task.boardId,
          columnId: task.columnId,
          userId: task.userId,
        };
        return taskObject;
      });

      this.store.dispatch(TaskActions.tasksDataUpdatedAction({tasks: arr}));
      arr.forEach((task)=>this.tasksService.updateTask(this.boardId,event.container.id,task.id,{
        boardId: task.boardId,
        columnId: task.columnId,
        description: task.description,
        done: task.done,
        order: task.order,
        title: task.title,
        userId: task.userId,
      }).subscribe())
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onTitleClick(): void {
    this.isTitleEditing = true;
  }

  saveTitle(): void {
    if (this.column) {
      this.store.dispatch(updateColumn({
        boardId: this.boardId,
        columnId: this.column.id,
        updateColumn: {title: this.inputTitle.nativeElement.value, order: this.column.order},
      }));
    }

    this.isTitleEditing = false;
  }

  cancelTitle(): void {
    this.isTitleEditing = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
