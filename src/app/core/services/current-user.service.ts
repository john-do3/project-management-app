import { Injectable } from '@angular/core';
import { State, Store } from '@ngrx/store';
import {
 of, switchMap, tap, timer,
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from '../../redux/state-models';
import { addCurrentUserData } from '../../redux/actions/currentUser.actions';
import { UserService } from './user.service';
import { selectTokenCreationTime } from '../../redux/selectors/currentUser.selector';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  constructor(
    private readonly state: State<AppState>,
    private readonly store: Store,
    private userService: UserService,
    ) {
  }

  private tokenMaxLifeTime = 30000;
  // private tokenMaxLifeTime = 24 * 60 * 1000 - 10000;

  private get tokenMaxLifeTimeMs(): number {
    return Date.now() - this.tokenMaxLifeTime;
  }

  private tokenCreationTime$ = this.store.select(selectTokenCreationTime);

  public auditToken$ = this.tokenCreationTime$.pipe(
    catchError(() => of(Date.now())),
    switchMap((time: number) => {
      const tokenLifeTime = time - this.tokenMaxLifeTimeMs;
      console.log('tokenLifeTime', tokenLifeTime);
      return this.auditInterval$(tokenLifeTime);
    }),
  );

  private auditInterval$ = (value: number) => timer(value)
      .pipe(
        tap(() => {
          this.userService.logout();
        }),
      );

  public addTokenCreationTime(time: number){
    this.store.dispatch(addCurrentUserData({ currentTime: time }));
  }
}
