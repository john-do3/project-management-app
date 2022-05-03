import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { IColumnState } from '../../../redux/state-models';
import { selectColumns } from '../../../redux/selectors/column.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  constructor(private store: Store) {
  }

  private columns?: IColumnState[];

  public columns$?: Observable<IColumnState[]>;

  private columnsSubscription = this.columns$?.subscribe((columns)=> this.columns = columns)

  public dropColumn(event: CdkDragDrop<string[]>) {
    if (this.columns) {
      moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    }
  }

  ngOnInit(): void {
    this.columns$ = this.store.select(selectColumns);
  }

  ngOnDestroy() {
    this.columnsSubscription?.unsubscribe()
  }
}
