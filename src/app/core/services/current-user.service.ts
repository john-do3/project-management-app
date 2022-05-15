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

  private tokenMaxLifeTime = 24*60*1000 - 10000;

  private get tokenMaxLifeTimeMs(): number {
    return Date.now() - this.tokenMaxLifeTime;
  };


  private tokenCreationTime$ = this.store.select(selectTokenCreationTime);


  public auditToken$ = this.tokenCreationTime$.pipe(
    catchError((error) => of(Date.now())),
    switchMap((time: number)=> {
      console.log(time, '!!!')
      const tokenLifeTime = time - this.tokenMaxLifeTimeMs;
      console.log(time, tokenLifeTime)
      // this.tokenLifeTime = time?  || 2000;
      return this.auditInterval$(tokenLifeTime)
    })
  )


  public auditInterval$ = (value: number) =>
    timer(value)
      .pipe(
        tap(() => {
          this.userService.logout()
          // console.log(new Date().getSeconds(), this.tokenLifeTime, this.lifeTime);
        })
      );

  public addTokenCreationTime(){
    this.store.dispatch(addCurrentUserData({currentTime: Date.now()}))
  }



}
