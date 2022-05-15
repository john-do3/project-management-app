import { Injectable } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { AppState } from '../../redux/state-models';
import { addCurrentUserData } from '../../redux/actions/currentUser.actions';
import { UserService } from './user.service';
import { interval, Observable, of, Subject, Subscription, switchMap, take, tap, timer } from 'rxjs';
import { selectTokenCreationTime } from '../../redux/selectors/currentUser.selector';
import { catchError } from 'rxjs/operators';
import { HttpErrorService } from './httperror.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  constructor(
    private readonly state: State<AppState>,
    private readonly store: Store,
    private userService: UserService,
    private httpErrorService: HttpErrorService,
    ) {
  }

  private subscriptions = new Subscription();

  private get userLogin() {
    return this.userService.getUserLogin()
  }

  private tokenLifeTime = 40000;

  public get lifeTime() {
    return this.tokenLifeTime
  }

  private tokenCreationTime$ = this.store.select(selectTokenCreationTime)
    // .pipe(
    // take(1),

  // );

  public auditToken$ = this.tokenCreationTime$.pipe(
    catchError((error) => of(console.log(error))),
    switchMap((v)=> {
      console.log(v);
      this.tokenLifeTime = 2000;
      return this.auditInterval$(this.tokenLifeTime)
      // interval(this.lifeTime)
      //   .pipe(
      //     tap(() => {
      //       this.userService.logout()
      //       console.log(new Date().getSeconds(), this.tokenLifeTime, this.lifeTime);
      //     })
      //   );
    })
  )


  public auditInterval$ = (value: number) =>
    interval(value)
      .pipe(
        tap(() => {
          this.userService.logout()
          console.log(new Date().getSeconds(), this.tokenLifeTime, this.lifeTime);
        })
      );

  public addTokenCreationTime(){
    this.store.dispatch(addCurrentUserData({currentTime: Date.now()}))
  }



}
