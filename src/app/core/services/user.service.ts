import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
 catchError, Observable, Subject, throwError,
} from 'rxjs';
import { kanbanServiceUrl } from 'src/app/project.constants';
import { CreateUserDto } from 'src/app/shared/models/createUserDto.model';
import { SigninUserDto } from 'src/app/shared/models/signInUserDto';
import { LoginResponseDto } from 'src/app/shared/models/loginResponseDto';

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
    private toastr: ToastrService,
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
      catchError((error) => this.handleError(error)),
    );
  }

  public login(loginUserDto: SigninUserDto): void{
    this.http.post<LoginResponseDto>(`${kanbanServiceUrl}/signin`, loginUserDto, this.httpOptions)
      .pipe(
        catchError((error) => this.handleError(error)),
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
        catchError((error) => this.handleError(error)),
      )
    .subscribe();
  }

  public logout(): void{
    this.userName = '';
    this.token = '';
    localStorage.removeItem(this.tokenKey);
    this.IsLoggedIn.next(false);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.message);
      this.toastr.error(error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      this.toastr.error(error.error.message);
    }

    return throwError(() => new Error(
      'Something bad happened; please try again later.',
    ));
  }
}
