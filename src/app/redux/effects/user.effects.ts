import { Injectable } from '@angular/core';
import {
    Actions, ofType, createEffect,
} from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) { }

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loadUsersData),
        switchMap(() => this.userService
            .loadUsers()
            .pipe(
                map((loadUsersResponse) => UserActions.usersDataLoaded({ users: loadUsersResponse })),
                catchError(async (error) => UserActions.apiCallFailed(error)),

            )),

    ));
}
