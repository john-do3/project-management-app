import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
    Observable, throwError,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpErrorService {
    constructor(private toastr: ToastrService) {}

    public handleError(error: HttpErrorResponse): Observable<never> {
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
