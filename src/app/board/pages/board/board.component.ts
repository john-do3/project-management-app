import {
 Component, Input,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { BoardService } from 'src/app/core/services/board.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { IColumnState } from '../../../redux/state-models';
import { selectColumns } from '../../../redux/selectors/column.selector';
import * as ColumnActions from '../../../redux/actions/column.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  constructor(private store: Store, private boardService: BoardService, private headerService: HeaderService) {
  }

  columns$ = this.store.select(selectColumns);

  @Input() boardId!: string;

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

  onAddColumnClick(): void{
    this.headerService.newColumnClick();
  }
}
