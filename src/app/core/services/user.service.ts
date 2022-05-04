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
import { IUserState } from '../../redux/state-models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string | null;

  private userLogin: string;

  private tokenKey = 'authToken';

  private loginKey = 'userLogin';

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
    this.userLogin = localStorage.getItem(this.loginKey) ?? '';
    this.IsLoggedIn.next(!!this.token);
}

  checkIsLoggedIn(): boolean {
    return !!this.token;
  }

  getUserLogin(): string{
    return this.userLogin;
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
          localStorage.setItem(this.loginKey, loginUserDto.login);

          this.token = response.token;
          this.userLogin = loginUserDto.login;
          this.IsLoggedIn.next(true);
        },
        () => {
          // todo error handling if needed
        },
      );
  }

  public delete(userId: string) {
    return this.http.delete(`${kanbanServiceUrl}/users/${userId}`)
      .pipe(
        catchError((error) => this.httpErrorService.handleError(error)),
      )
      .subscribe(
        () => {
          this.logout();
        },
      );
  }

  public logout(): void{
    this.userLogin = '';
    this.token = '';
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.loginKey);
    this.IsLoggedIn.next(false);
  }

  public loadUsers(): Observable<ReadonlyArray<IUserState>> {
    return this.http.get<IUserState[]>(`${kanbanServiceUrl}/users`, {})
      .pipe(
        catchError((error) => this.httpErrorService.handleError(error)),
      );
  }
}
