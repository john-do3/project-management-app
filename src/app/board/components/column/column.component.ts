import {
 Component, ElementRef, Input, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable, of, Subscription,
} from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';
import { HeaderService } from 'src/app/core/services/header.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { selectTasks, selectTasksId } from '../../../redux/selectors/task.selector';
import { IColumnState, ITaskState } from '../../../redux/state-models';
import { selectColumnId } from '../../../redux/selectors/column.selector';
import {
  loadTasksAction,
} from '../../../redux/actions/task.actions';
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

  public tasks$?: Observable<ITaskState[]>;

  public tasksID$: Observable<string[]> = of(['']);

  public columnsID$: Observable<string[]> = of(['']);

  onNewTaskClick(): void {
    this.tasksService.newTaskClick({ boardId: this.boardId, columnId: this.columnId });
  }

  onDeleteColumnClick(columnId?: string): void {
    if (columnId) this.boardService.DeleteColumnClicked.next(columnId);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasksAction({ boardId: this.boardId, columnId: this.columnId }));

    this.tasks$ = this.store.select(selectTasks).pipe(
      map((value) => value.filter((val) => val.boardId === this.boardId && val.columnId === this.columnId)),
    );

   this.tasksID$ = this.store.select(selectTasksId);
    this.columnsID$ = this.store.select(selectColumnId);
  }

  public columnsIdArray = [''];

  drop(event: CdkDragDrop<any>): void {
    console.log(event);
    /* if (event.previousContainer === event.container) {
      console.log(event, event.container.data, event.previousIndex, event.currentIndex, this.tasksIdArray);

      const subscribe = this.tasksArray$.pipe(
        take(1),
        map(([...tasks]:ITaskState[]) => {
          const array = tasks.map((task) => {
            const taskObject: ITaskState = {
              boardId: task.boardId,
              columnId: task.columnId,
              description: task.description,
              done: task.done,
              order: task.order,
              title: task.title,
              userId: task.userId,
              id: task.id,
            };
            if (task.order === event.previousIndex) {
              taskObject.order = event.currentIndex;
            } else if (task.order === event.currentIndex) {
              taskObject.order = event.previousIndex;
            }
            return taskObject;
          });
          console.log(array);
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
          this.store.dispatch(tasksDataReceivedAction({ tasks: array }));
          // array.forEach((a)=>this.store.dispatch(updateTaskData({task:a})))
        }),
      ).subscribe();

      subscribe?.unsubscribe();

      // this.store.dispatch(updateTaskData( {
      //   description: '', title: '', userId: '',
      //   boardId: this.boardId,
      //
      //   // columnId: this.columnId,
      //   columnId: event.container.id,
      //   done: false,
      //   id: <string>event.container.data[event.previousIndex],
      //   order: event.currentIndex
      // }));
      // this.store.dispatch(updateTaskData({
      //   taskId: event.container.data[event.currentIndex],
      //   columnId: event.container.id,
      //   order: event.previousIndex,
      // }));
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // subscribe?.unsubscribe();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } */
  }

  onTitleClick(): void {
    this.isTitleEditing = true;
  }

  saveTitle(): void {
    if (this.column) {
      this.store.dispatch(updateColumn({
        boardId: this.boardId,
        columnId: this.column.id,
        updateColumn: { title: this.inputTitle.nativeElement.value, order: this.column.order },
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
