import {
 Component, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BoardService } from 'src/app/core/services/board.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { loadBoardsData } from 'src/app/redux/actions/board.actions';
import { selectBoards } from 'src/app/redux/selectors/board.selector';
import { IBoardState } from 'src/app/redux/state-models';
import { boardsRoute } from 'src/app/project.constants';
import { ConfirmModalComponent } from 'src/app/shared/pages/confirm-modal/confirm-modal.component';
import {
  createBoardData,
  deleteBoardData,
} from '../../../redux/actions/board.actions';
import { CreateBoardComponent } from '../create-board/create-board.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {
  boardId!: string;

  createBoardInProgress = false;

  boards!: IBoardState[];

  @ViewChild('drawer', { static: true })
  sidenav!: MatSidenav;

  boardsData$ = this.store.select(selectBoards);

  private subscriptions = new Subscription();

  constructor(
    private headerService: HeaderService,
    private boardService: BoardService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.headerService.NewBoardClicked.subscribe(() => {
        if (!this.createBoardInProgress) {
          this.createBoardInProgress = true;
          this.openCreateBoardDialog();
        }
      }),
    );

    this.subscriptions.add(
      this.headerService.GetBoardsClicked.subscribe((val) => {
        this.boards = val;
      }),
    );

    this.sidenav.toggle();
    this.store.dispatch(loadBoardsData());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openCreateBoardDialog(): void {
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      width: '250px',
      data: { title: '' },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.createBoardInProgress = false;

      // if (data) this.boardService.createBoard({ title: data });
      this.store.dispatch(createBoardData({ title: data }));
    });
  }

  openDeleteBoardDialog(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.store.dispatch(deleteBoardData({ boardId: this.boardId }));
        this.router.navigateByUrl(boardsRoute);
      }
    });
  }

  onNewBoardClick(): void {
    this.headerService.newBoardClick();
  }

  onDeleteBoardClick(): void {
    this.openDeleteBoardDialog();
  }

  onBoardSelected(event: any): void {
    this.boardId = event.options[0].value;
    this.router.navigateByUrl(`${boardsRoute}/${this.boardId}`);
  }
}
