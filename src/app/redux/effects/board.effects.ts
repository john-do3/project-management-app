import { Injectable } from '@angular/core';
import {
    Actions, ofType, createEffect,
} from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { BoardService } from '../../core/services/board.service';
import * as BoardActions from '../actions/board.actions';

@Injectable()
export class BoardEffects {
    constructor(
        private actions$: Actions,
        private boardService: BoardService,
    ) { }

    loadBoards$ = createEffect(() => this.actions$.pipe(
        ofType(BoardActions.loadBoardsData),
        switchMap(() => this.boardService
          .loadBoards()
          .pipe(
            map((loadBoardsResponse) => BoardActions.boardsDataLoaded({ boards: loadBoardsResponse })),
            catchError(async (error) => BoardActions.apiCallFailed(error)),
          )),
      ));

    createBoard = createEffect(() => this.actions$.pipe(
        ofType(BoardActions.createBoardData),
        switchMap((action) => this.boardService
            .createBoard({ title: action.title })
            .pipe(
                map((createBoardResponse) => BoardActions.boardCreated({ board: createBoardResponse })),
                catchError(async (error) => BoardActions.apiCallFailed(error)),
            )),

    ));

    deleteBoard = createEffect(() => this.actions$.pipe(
        ofType(BoardActions.deleteBoardData),
        switchMap((action) => this.boardService
            .deleteBoard(action.boardId)
            .pipe(
                map(() => BoardActions.boardDeleted({ boardId: action.boardId })),
                catchError(async (error) => BoardActions.apiCallFailed(error)),
            )),
    ));
}
