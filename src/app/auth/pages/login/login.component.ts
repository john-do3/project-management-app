import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { mainRoute } from 'src/app/project.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  login!: string;

  password!: string;

  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.checkIsLoggedIn()) this.router.navigateByUrl(mainRoute);
  }

  onSubmit(): void {
    this.userService
      .login({
        login: this.loginForm.get('login')?.value,
        password: this.loginForm.get('password')?.value,
      });
  }
}
