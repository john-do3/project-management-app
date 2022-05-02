import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class HeaderService {
    public NewBoardClicked: Subject<boolean> = new Subject<boolean>();

    newBoardClick(): void {
        this.NewBoardClicked.next(true);
    }
}
