import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { kanbanServiceUrl } from 'src/app/project.constants';
import { IBoardState } from 'src/app/redux/state-models';
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

    public createBoard(newBoard: CreateBoardDto): Observable<IBoardState> {
        return this.http.post<IBoardState>(`${kanbanServiceUrl}/boards`, newBoard, this.httpOptions)
            .pipe(
                catchError((error) => this.httpErrorService.handleError(error)),
            );
    }

    public deleteBoard(boardId: string) {
        return this.http.delete(`${kanbanServiceUrl}/boards/${boardId}`)
            .pipe(
                catchError((error) => this.httpErrorService.handleError(error)),
            );
    }

    public loadBoards(): Observable<ReadonlyArray<IBoardState>> {
        return this.http.get<IBoardState[]>(`${kanbanServiceUrl}/boards`, {})
            .pipe(
                catchError((error) => this.httpErrorService.handleError(error)),
            );
    }
}
