import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';
import { kanbanServiceUrl } from 'src/app/project.constants';
import { CreateUserDto } from 'src/app/shared/models/createUserDto.model';
import { SigninUserDto } from 'src/app/shared/models/signInUserDto';
import { LoginResponseDto } from 'src/app/shared/models/loginResponseDto';
import { Store } from '@ngrx/store';
import { loadUsersData } from 'src/app/redux/actions/user.actions';
import { HttpErrorService } from './httperror.service';
import { IUserState } from '../../redux/state-models';
import { addCurrentUserData } from '../../redux/actions/currentUser.actions';
import { ITokenBody } from '../../shared/models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string | null;

  private userLogin: string;

  userLogin$: Subject<string> = new Subject<string>();

  private tokenKey = 'authToken';

  private loginKey = 'userLogin';

  IsLoggedIn: Subject<boolean> = new Subject<boolean>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private store: Store,
    private http: HttpClient,
    private httpErrorService: HttpErrorService,
  ) {
    this.token = localStorage.getItem(this.tokenKey);
    this.userLogin = localStorage.getItem(this.loginKey) ?? '';
    this.userLogin$.next(localStorage.getItem(this.loginKey) ?? '');
    this.IsLoggedIn.next(!!this.token);
  }

  private encodeToken(token: string) {
    const tokenBody = token.split(/\./)[1];
    const tokenBodyDecoded: ITokenBody = JSON.parse(window.atob(tokenBody));
    return tokenBodyDecoded.iat * 1000;
  }

  checkIsLoggedIn(): boolean {
    return !!this.token;
  }

  getUserLogin(): string {
    return this.userLogin;
  }

  public signUp(newUserDto: CreateUserDto): Observable<CreateUserDto> {
    return this.http
      .post<CreateUserDto>(
        `${kanbanServiceUrl}/signup`,
        newUserDto,
        this.httpOptions,
      )
      .pipe(catchError((error) => this.httpErrorService.handleError(error)));
  }

  public login(loginUserDto: SigninUserDto): void {
    this.http
      .post<LoginResponseDto>(
        `${kanbanServiceUrl}/signin`,
        loginUserDto,
        this.httpOptions,
      )
      .pipe(catchError((error) => this.httpErrorService.handleError(error)))
      .subscribe(
        (response) => {
          console.log(response.token);

          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.loginKey, loginUserDto.login);

          localStorage.setItem('tokenTime', Date.now().toString());
          this.token = response.token;

          this.store.dispatch(addCurrentUserData({ currentTime: this.encodeToken(response.token) }));

          this.userLogin = loginUserDto.login;
          this.IsLoggedIn.next(true);
        },
        () => {
          // todo error handling if needed
        },
      );
  }

  public delete(userId: string) {
    return this.http
      .delete(`${kanbanServiceUrl}/users/${userId}`)
      .pipe(catchError((error) => this.httpErrorService.handleError(error)))
      .subscribe(() => {
        this.logout();
      });
  }

  public logout(): void {
    this.userLogin = '';
    this.token = '';
    localStorage.removeItem('tokenTime');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.loginKey);
    this.IsLoggedIn.next(false);
  }

  public loadUsers(): Observable<ReadonlyArray<IUserState>> {
    return this.http
      .get<IUserState[]>(`${kanbanServiceUrl}/users`, {})
      .pipe(catchError((error) => this.httpErrorService.handleError(error)));
  }

  public updateUser(userId: string, newCred: CreateUserDto) {
    return this.http
      .put<CreateUserDto>(`${kanbanServiceUrl}/users/${userId}`, newCred)
      .pipe(catchError((error) => this.httpErrorService.handleError(error)))
      .subscribe((resp) => {
        localStorage.setItem(this.loginKey, resp.login);
        this.userLogin$.next(localStorage.getItem(this.loginKey) ?? '');
        this.store.dispatch(loadUsersData());
      });
  }
}
