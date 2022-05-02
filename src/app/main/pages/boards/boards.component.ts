import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BoardService } from 'src/app/core/services/board.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { CreateBoardComponent } from '../create-board/create-board.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {
  createBoardInProgress = false;

  private subscriptions = new Subscription();

  constructor(
    private headerService: HeaderService,
    private boardService: BoardService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.headerService.NewBoardClicked.subscribe(() => {
        if (!this.createBoardInProgress) {
          this.createBoardInProgress = true;
          this.openCreateBoardDialog();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openCreateBoardDialog(): void {
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      width: '250px',
      data: { title: '' },
    });

    dialogRef.afterClosed().subscribe(
      (data) => {
        this.createBoardInProgress = false;

        if (data) this.boardService.CreateBoard({ title: data });
      },
);
  }
}
