import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { kanbanServiceUrl } from 'src/app/project.constants';
import { CreateBoardDto } from 'src/app/shared/models/createBoardDto';
import { HttpErrorService } from './httperror.service';

@Injectable({
    providedIn: 'root',
})
export class BoardService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(
        private http: HttpClient,
        private httpErrorService: HttpErrorService,
    ) {}

    public CreateBoard(newBoard: CreateBoardDto): void {
        this.http.post<CreateBoardDto>(`${kanbanServiceUrl}/boards`, newBoard, this.httpOptions)
            .pipe(
                catchError((error) => this.httpErrorService.handleError(error)),
            )
            .subscribe();
    }

    public boardServiceCheck(): void {
        this.http.get<any>(`${kanbanServiceUrl}/boards`, {})
            .pipe(
                catchError((error) => this.httpErrorService.handleError(error)),
            )
            .subscribe();
    }
}
