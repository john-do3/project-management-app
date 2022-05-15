import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CurrUserActions from '../actions/currentUser.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BoardService } from '../../core/services/board.service';
import { CurrentUserService } from '../../core/services/current-user.service';
import * as UserActions from '../actions/user.actions';
import { UserService } from '../../core/services/user.service';

@Injectable()
export class ColumnEffects {
  constructor(
    private actions$: Actions,
    private currentUserService: CurrentUserService,
    private userService: UserService,
  ) {
  }

  createColumn = createEffect(() => this.actions$.pipe(
    ofType(CurrUserActions.addCurrentUserData),
    switchMap(() => this.userService
      .loadUsers()
      .pipe(
        map((loadUsersResponse) => UserActions.usersDataLoaded({ users: loadUsersResponse })),
        catchError(async (error) => UserActions.apiCallFailed(error)),

      )),
    // switchMap((action) => this.currentUserService
    //   .addTokenCreationTime(action.currentTime)
    //   .pipe(
    //     map((createColumnResponse) => ColumnActions.columnCreated({column: createColumnResponse})),
    //     catchError(async (error) => ColumnActions.apiCallFailed(error)),
    //   )),
  ));

  // deleteColumn = createEffect(() => this.actions$.pipe(
  //   ofType(ColumnActions.deleteColumnData),
  //   switchMap((action) => this.boardService
  //     .deleteColumn(action.boardId, action.columnId)
  //     .pipe(
  //       map(() => ColumnActions.columnDeleted({columnId: action.columnId})),
  //       catchError(async (error) => ColumnActions.apiCallFailed(error)),
  //     )),
  // ));
}
