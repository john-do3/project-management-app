import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mainRoute } from 'src/app/project.constants';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private userSrv: UserService) {}

  onLogin(): void {
    this.router.navigateByUrl('auth/login');
  }

  onSignUp(): void {
    this.router.navigateByUrl('auth/signup');
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userSrv.checkIsLoggedIn();
    if (this.isLoggedIn) this.router.navigateByUrl(mainRoute);
  }
}
