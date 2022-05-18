import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, Subscription, take, } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';
import { HeaderService } from 'src/app/core/services/header.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { selectTasks } from '../../../redux/selectors/task.selector';
import { IColumnState, ITaskState } from '../../../redux/state-models';
import { selectColumnId, selectColumns } from '../../../redux/selectors/column.selector';
import * as TaskActions from '../../../redux/actions/task.actions';
import { BoardService } from '../../../core/services/board.service';
import { updateColumn } from '../../../redux/actions/column.actions';

interface ITaskUpdatedData extends ITaskState {
  prevColumnId: string;
}

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

  public columns$ = this.store.select(selectColumns);

  public columnsId$: Observable<string[]> = this.columns$.pipe(
    map(([...columns]) => columns.map((column) => column.id))
  );


  // public columnsID$ = this.store.select(selectColumnId);
  // public columnsID$: Observable<string[]> = of(['']);

  onNewTaskClick(): void {
    this.tasksService.newTaskClick({boardId: this.boardId, columnId: this.columnId});
  }

  onDeleteColumnClick(columnId?: string): void {
    if (columnId) this.boardService.DeleteColumnClicked.next(columnId);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasksAction({
      boardId: this.boardId,
      columnId: this.columnId
    }));
    this.subscriptions.add(this.columnsId$.subscribe((columsIdArray) => this.columnsIdArray = columsIdArray));
    // this.tasks$ = this.store.select(selectTasks).pipe(
    //   map((value) => value.filter((val) => val.boardId === this.boardId && val.columnId === this.columnId)),
    // );

    // this.tasksID$ = this.store.select(selectTasksId);
    // this.columnsID$ = this.store.select(selectColumnId);


  }


  public columnsIdArray = [''];

  public updateTasks(data: ITaskState[], columnId: string) {
    const arr = <ITaskUpdatedData[]>(data).map((task: ITaskState, i: number) => {
      const taskObject: ITaskUpdatedData = {
        id: task.id,
        title: task.title,
        done: task.done,
        order: i,
        description: task.description,
        boardId: task.boardId,
        columnId: columnId,
        prevColumnId: task.columnId,
        userId: task.userId,
      };
      return taskObject;
    })

    this.store.dispatch(TaskActions.tasksDataUpdatedAction({tasks: arr}));
    arr.forEach((task) => this.tasksService.updateTask(task.boardId, task.prevColumnId, task.id, {
      boardId: task.boardId,
      columnId: columnId,
      description: task.description,
      done: task.done,
      order: task.order,
      title: task.title,
      userId: task.userId,
    }).subscribe());
  }

  public drop(event: CdkDragDrop<any>): void {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTasks(event.container.data, event.container.id);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex, event.item.data);
      this.updateTasks(event.container.data, event.container.id);

      if (event.previousContainer.data.length >0 ) {
        this.updateTasks(event.previousContainer.data, event.previousContainer.id);
      } else {
        const deletedTask: ITaskState = event.item.data as ITaskState;
        this.store.dispatch(TaskActions.deleteTaskFromColumn({columnId: deletedTask.columnId!}))
      }
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
