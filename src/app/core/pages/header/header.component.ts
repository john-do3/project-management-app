import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { auditTime, interval, map, Subscription, take, tap } from 'rxjs';
import { mainRoute, welcomeRoute } from 'src/app/project.constants';
import { selectUsers } from 'src/app/redux/selectors/user.selector';
import { IUserState } from 'src/app/redux/state-models';
import { CreateUserDto } from 'src/app/shared/models/createUserDto.model';
import { ConfirmModalComponent } from 'src/app/shared/pages/confirm-modal/confirm-modal.component';
import { BoardService } from '../../services/board.service';
import { HeaderService } from '../../services/header.service';
import { UserService } from '../../services/user.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { CurrentUserService } from '../../services/current-user.service';
import { addCurrentUserData } from '../../../redux/actions/currentUser.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  isLangSlideToggled = false;

  userLogin!: string;

  usersData$ = this.store.select(selectUsers);

  private subscriptions = new Subscription();

  constructor(
    private userService: UserService,
    private headerService: HeaderService,
    private boardService: BoardService,
    private currentUserService: CurrentUserService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private router: Router,
    private store: Store,
  ) {}

  private tokenTimeSubscription = new Subscription()

  ngOnInit(): void {
    // this.tokenTimeSubscription.add(this.currentUserService.auditInterval$.subscribe)
    // this.currentUserService.addTokenCreationTime()
    const tokenTime = localStorage.getItem('tokenTime');
    if (tokenTime){
      this.store.dispatch(addCurrentUserData({currentTime: +tokenTime}))
    }


    this.isLoggedIn = this.userService.checkIsLoggedIn();
    this.userLogin = this.userService.getUserLogin();
    this.userService.userLogin$.subscribe((res) => {
      this.userLogin = res;
      console.log(this.userLogin);
    });

    console.log(this.isLoggedIn)

    this.tokenTimeSubscription.add(this.currentUserService.auditToken$.subscribe())
    if (!this.isLoggedIn) {
      this.tokenTimeSubscription.unsubscribe()
    }


    this.subscriptions.add(
      this.userService.IsLoggedIn.subscribe((val) => {
        this.isLoggedIn = val;
        this.userLogin = this.userService.getUserLogin();
        if (this.isLoggedIn) {
          console.log(this.tokenTimeSubscription.closed, this.tokenTimeSubscription)
          if (this.tokenTimeSubscription.closed){
            this.tokenTimeSubscription = new Subscription()
            this.tokenTimeSubscription.add(this.currentUserService.auditToken$.subscribe())
          }
          this.router.navigateByUrl(mainRoute);
        }
        else {
          this.router.navigateByUrl(welcomeRoute);
          this.tokenTimeSubscription.unsubscribe()
        }
        this.ref.detectChanges();
      }),
    );
  }

  GetLangName(): string {
    let result = 'EN';
    if (this.isLangSlideToggled) {
      result = 'RU';
    }
    return result;
  }

  onLogout(): void {
    this.userService.logout();
  }

  onDeleteUser(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        const $ = this.usersData$
          .pipe(
            map((val: IUserState[]) => {
              const user = val.find((x) => x.login === this.userLogin);
              if (user) {
                this.userService.delete(user.id);
                this.onLogout();
                $.unsubscribe();
              }
            }),
          )
          .subscribe();
      }
    });
  }

  onEditProfile(): void {
    const userData = this.usersData$
      .pipe(
        map((val: IUserState[]) => {
          const user = val.find((x) => x.login === this.userLogin);
          if (user) {
            const dialogRef = this.dialog.open(EditProfileComponent, {
              minWidth: '300px',
              width: '50%',
              data: { login: user.login, name: user.name },
            });
            dialogRef.afterClosed().subscribe((data: CreateUserDto) => {
              if (data) {
                this.userService.updateUser(user.id, data);
              }
            });
          }
        }),
      )
      .subscribe();
    userData.unsubscribe();
  }
}
