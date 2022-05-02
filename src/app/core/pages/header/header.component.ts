import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { loginRoute, mainRoute } from 'src/app/project.constants';
import { BoardService } from '../../services/board.service';
import { HeaderService } from '../../services/header.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  isLangSlideToggled = false;

  userName!: string | null;

  private subscriptions = new Subscription();

  constructor(
    private userService: UserService,
    private headerService: HeaderService,
    private boardService: BoardService,
    private ref: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.checkIsLoggedIn();

    this.subscriptions.add(
      this.userService.IsLoggedIn.subscribe((val) => {
        this.isLoggedIn = val;
        this.userName = this.userService.getUserName();
        if (this.isLoggedIn) this.router.navigateByUrl(mainRoute);
        else this.router.navigateByUrl(loginRoute);
        this.ref.detectChanges();
      }),
    );
  }

  GetLangName(): string {
    let result = 'EN';
    if (this.isLangSlideToggled) { result = 'RU'; }
    return result;
  }

  onLogin(): void {
    this.router.navigateByUrl('auth/login');
  }

  onSignUp(): void {
    this.router.navigateByUrl('auth/signup');
  }

  onLogout(): void {
    this.userService.logout();
  }
}
