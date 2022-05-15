import { Injectable } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { AppState } from '../../redux/state-models';
import { addCurrentUserData } from '../../redux/actions/currentUser.actions';
import { UserService } from './user.service';
import { interval, Observable, of, Subscription, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  constructor(
    private readonly state: State<AppState>,
    private readonly store: Store,
    private userService: UserService
    ) {
  }

  private subscriptions = new Subscription();

  private get userLogin() {
    return this.userService.getUserLogin()
  }

  // private get userId() {
  //
  // }
  // private get currentTime(){
  //   return Date.now()
  // }

  // public setTimer$ = timer(10000)

  // const time = 3000
  private tokenLifeTime = 4000;

  public auditInterval$ =
    interval(this.tokenLifeTime)
      .pipe(
        // take(time),
        // auditTime(time),
        tap(x => console.log(new Date().getSeconds()))
      );

  public addTokenCreationTime(){
    const tics =123;
    const creationTime = 1652533871556;
    const timer$ = timer(Date.now()+10000 - creationTime);
    timer$.subscribe((c)=> console.log(creationTime- Date.now(), new Date(creationTime), new Date().toString()))
    // this.subscriptions.add(
    //   of(this.currentTime - creationTime).subscribe((val)=>console.log(Date.now() - creationTime))
    // )

    // this.store.dispatch(addCurrentUserData({currentTime: currentTime}))
  }

  public relogin() {
    console.log(stop)
  }
}
