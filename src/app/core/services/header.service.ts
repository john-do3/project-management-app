import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IBoardState } from 'src/app/redux/state-models';

@Injectable({
    providedIn: 'root',
})

export class HeaderService {
    public NewBoardClicked: Subject<boolean> = new Subject<boolean>();

    public GetBoardsClicked: Subject<IBoardState[]> = new Subject<IBoardState[]>();

    newBoardClick(): void {
        this.NewBoardClicked.next(true);
    }
}
