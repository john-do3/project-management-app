import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';
import { kanbanServiceUrl } from 'src/app/project.constants';
import { IBoardState, IColumnState } from 'src/app/redux/state-models';
import { CreateBoardDto } from 'src/app/shared/models/createBoardDto';
import { CreateColumnDto } from 'src/app/shared/models/createColumnDto';
import { HttpErrorService } from './httperror.service';

@Injectable({
    providedIn: 'root',
})
export class BoardService {
    CreateColumnClicked: Subject<boolean> = new Subject<boolean>();

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

    public loadColumns(boardId: string): Observable<ReadonlyArray<IColumnState>> {
        return this.http.get<IColumnState[]>(`${kanbanServiceUrl}/boards/${boardId}/columns`, {})
            .pipe(
                catchError((error) => this.httpErrorService.handleError(error)),
            );
    }

    public createColumn(boardId: string, newColumn: CreateColumnDto): Observable<IColumnState>{
        return this.http.post<IColumnState>(`${kanbanServiceUrl}/boards/${boardId}/columns`, newColumn, this.httpOptions)
            .pipe(
                catchError((error) => this.httpErrorService.handleError(error)),
            );
    }

    public deleteColumn(boardId: string, columnId: string) {
        return this.http.delete(`${kanbanServiceUrl}/boards/${boardId}/columns/${columnId}`)
            .pipe(
                catchError((error) => this.httpErrorService.handleError(error)),
            );
    }
}
