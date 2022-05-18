import {
 Component, Input,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { BoardService } from 'src/app/core/services/board.service';
import { IColumnState } from '../../../redux/state-models';
import { selectColumns } from '../../../redux/selectors/column.selector';
import * as ColumnActions from '../../../redux/actions/column.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  constructor(private store: Store, private boardService: BoardService) {
  }

  // private columns?: IColumnState[];
  // public columns$?: Observable<IColumnState[]>;
  columns$ = this.store.select(selectColumns);

  @Input() boardId!: string;
  /* private columnsSubscription = this.columns$?.subscribe((columns) => {
    this.columns = columns;
  }); */

  public dropColumn(event: CdkDragDrop<string[]>) {
    if (event.previousIndex === event.currentIndex) return;

    this.columns$
      .pipe(
        take(1),
        map((cols: IColumnState[]) => {
          if (cols) {
            const array = [...cols];

            moveItemInArray(array, event.previousIndex, event.currentIndex);
            let iOrder = 1;
            let maxOrder = 0;
            if (cols.length > 0) maxOrder = Math.max(...cols.map((c) => c.order));

            array.forEach((column: IColumnState, index) => {
              if (this.boardId) {
                const newOrder = maxOrder + iOrder;

                console.log(`Column ${column.title} order is changed from ${column.order} to ${newOrder
                  }`);

                iOrder += 1;
                array[index] = { ...array[index], order: newOrder };
              }
            });

            this.store.dispatch(ColumnActions.columnsDataLoaded({ columns: array }));

            array.forEach((column: IColumnState) => {
              if (this.boardId) {
                this.boardService.updateColumn(this.boardId, column.id, { title: column.title, order: column.order }).subscribe();
              }
            });
          }
        }),
      )
      .subscribe();
  }

  onClick() {
    /* let column: IColumnState;
    let task: ITaskState;
    // this.store.dispatch(addBoardAction({ board }));
    column = column1;
    this.store.dispatch(addColumnAction({ column }));
    column = column2;
    this.store.dispatch(addColumnAction({ column }));
    task = task1;
    this.store.dispatch((addTaskAction({ task })));
    task = task2;
    this.store.dispatch((addTaskAction({ task })));
    task = task3;
    this.store.dispatch((addTaskAction({ task })));
    task = task4;
    this.store.dispatch((addTaskAction({ task })));
    console.log(this.store); */
  }
}
