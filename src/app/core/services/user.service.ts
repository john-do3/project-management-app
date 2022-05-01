import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
 catchError, Observable, Subject,
} from 'rxjs';
import { kanbanServiceUrl } from 'src/app/project.constants';
import { CreateUserDto } from 'src/app/shared/models/createUserDto.model';
import { SigninUserDto } from 'src/app/shared/models/signInUserDto';
import { LoginResponseDto } from 'src/app/shared/models/loginResponseDto';
import { HttpErrorService } from './httperror.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string | null;

  private userName!: string;

  private tokenKey = 'authToken';

  IsLoggedIn: Subject<boolean> = new Subject<boolean>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private httpErrorService: HttpErrorService,
) {
    this.token = localStorage.getItem(this.tokenKey);
    this.IsLoggedIn.next(!!this.token);
}

  checkIsLoggedIn(): boolean {
    return !!this.token;
  }

  getUserName(): string{
    return this.userName;
  }

  public signUp(newUserDto: CreateUserDto): Observable<CreateUserDto>{
    return this.http.post<CreateUserDto>(`${kanbanServiceUrl}/signup`, newUserDto, this.httpOptions)
    .pipe(
      catchError((error) => this.httpErrorService.handleError(error)),
    );
  }

  public login(loginUserDto: SigninUserDto): void{
    this.http.post<LoginResponseDto>(`${kanbanServiceUrl}/signin`, loginUserDto, this.httpOptions)
      .pipe(
        catchError((error) => this.httpErrorService.handleError(error)),
      )
      .subscribe(
        (response) => {
          console.log(response.token);
          localStorage.setItem(this.tokenKey, response.token);
          this.token = response.token;
          this.userName = loginUserDto.login;
          this.IsLoggedIn.next(true);
        },
        () => {
          // todo error handling if needed
        },
      );
  }

  public boardServiceCheck(): void{
    this.http.post<any>(`${kanbanServiceUrl}/boards`, {}, this.httpOptions)
      .pipe(
        catchError((error) => this.httpErrorService.handleError(error)),
      )
    .subscribe();
  }

  public logout(): void{
    this.userName = '';
    this.token = '';
    localStorage.removeItem(this.tokenKey);
    this.IsLoggedIn.next(false);
  }
}
