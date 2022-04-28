import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isLangSlideToggled = false;
  userName!: string | null;

  private subscriptions = new Subscription();
  constructor(
    private userService: UserService,
    private ref: ChangeDetectorRef,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.checkIsLoggedIn();

    this.subscriptions.add(
      this.userService.IsLoggedIn.subscribe((val) => {
        this.isLoggedIn = val;
        // todo this.userName = this.userService.getUserName();
        this.ref.detectChanges();
      }),
    );
  }

  GetLangName(): string {
    let result = 'EN';
    if (this.isLangSlideToggled)
      result = 'RU';
    return result;
  }

  onLogin(): void{
    this.router.navigateByUrl('auth/login');
  }

  onSignUp():void{
    this.router.navigateByUrl('auth/signup');
  }
}
