import { ApplicationModule, Injectable } from '@angular/core';
import {
    Actions, ofType, createEffect,
} from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { BoardService } from '../../core/services/board.service';
import * as ColumnActions from '../actions/column.actions';

@Injectable()
export class ColumnEffects {
    constructor(
        private actions$: Actions,
        private boardService: BoardService,
    ) { }

    loadColumns$ = createEffect(() => this.actions$.pipe(
        ofType(ColumnActions.loadColumnsData),
        switchMap((action) => this.boardService
            .loadColumns(action.boardId)
            .pipe(
                map((loadColumnResponse) => ColumnActions.columnsDataLoaded({ columns: loadColumnResponse })),
                catchError(async (error) => ColumnActions.apiCallFailed(error)),
            )),
    ));

    createColumn = createEffect(() => this.actions$.pipe(
        ofType(ColumnActions.createColumnData),
        switchMap((action) => this.boardService
            .createColumn( action.boardId, { title: action.title, order: action.order })
            .pipe(
                map((createColumnResponse) => ColumnActions.columnCreated({ column: createColumnResponse })),
                catchError(async (error) => ColumnActions.apiCallFailed(error)),
            )),

    ));

    deleteColumn = createEffect(() => this.actions$.pipe(
        ofType(ColumnActions.deleteColumnData),
        switchMap((action) => this.boardService
            .deleteColumn(action.boardId, action.columnId)
            .pipe(
                map(() => ColumnActions.columnDeleted({ columnId: action.columnId })),
                catchError(async (error) => ColumnActions.apiCallFailed(error)),
            )),
    )); 
}
