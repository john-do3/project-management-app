import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
 catchError, Observable, Subject, throwError,
} from 'rxjs';
import { kanbanServiceUrl } from 'src/app/project.constants';
import { CreateUserDto } from 'src/app/shared/models/createUserDto.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  IsLoggedIn: Subject<boolean> = new Subject<boolean>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
) { }

  checkIsLoggedIn(): boolean {
    // const token = localStorage.getItem(this.tokenKey);
    // return !!token;

    // todo
    return false;
  }

  public signUp(newUserDto: CreateUserDto): Observable<CreateUserDto>{
    return this.http.post<CreateUserDto>(`${kanbanServiceUrl}/signup`, newUserDto, this.httpOptions)
    .pipe(
      catchError((error) => this.handleError(error)),
    );
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
