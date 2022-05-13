import {
  Component, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatList } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
 map, Subscription, take,
} from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';
import { loadBoardsData } from 'src/app/redux/actions/board.actions';
import { loadUsersData } from 'src/app/redux/actions/user.actions';
import { selectBoards } from 'src/app/redux/selectors/board.selector';
import { IBoardState, IColumnState } from 'src/app/redux/state-models';
import { boardsRoute } from 'src/app/project.constants';
import { ConfirmModalComponent } from 'src/app/shared/pages/confirm-modal/confirm-modal.component';
import { BoardService } from 'src/app/core/services/board.service';
import { selectColumns } from 'src/app/redux/selectors/column.selector';
import {
  createColumnData,
  deleteColumnData,
  loadColumnsData,
} from 'src/app/redux/actions/column.actions';
import {
  createBoardData,
  deleteBoardData,
} from '../../../redux/actions/board.actions';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { TasksService } from '../../../board/services/tasks.service';
import { CreateColumnComponent } from '../create-column/create-column.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {
  boardId!: string;

  createBoardInProgress = false;

  createColumnInProgress = false;

  boards!: IBoardState[];

  @ViewChild('drawer', { static: true })
  sidenav!: MatSidenav;

  @ViewChild('boardsList', { static: true })
  boardsList!: MatList;

  boardsData$ = this.store.select(selectBoards);

  columnsData$ = this.store.select(selectColumns);

  private subscriptions = new Subscription();

  constructor(
    private headerService: HeaderService,
    private boardService: BoardService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private taskService: TasksService,
  ) {
    this.boardId = activateRoute.snapshot.params['id'];
    if (this.boardId) this.store.dispatch(loadColumnsData({ boardId: this.boardId }));
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsersData());
    this.subscriptions.add(
      this.headerService.NewBoardClicked.subscribe(() => {
        if (!this.createBoardInProgress) {
          this.createBoardInProgress = true;
          this.openCreateBoardDialog();
        }
      }),
    );

    this.subscriptions.add(
      this.headerService.NewColumnClicked.subscribe(() => {
        if (!this.createColumnInProgress) {
          this.createColumnInProgress = true;
          this.openCreateColumnDialog();
        }
      }),
    );

    this.subscriptions.add(
      this.headerService.GetBoardsClicked.subscribe((val) => {
        this.boards = val;
      }),
    );

    this.subscriptions.add(
      this.boardService.DeleteColumnClicked.subscribe((columnId) => {
          this.openDeleteColumnDialog(columnId);
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

      if (data) this.store.dispatch(createBoardData({ title: data, description: 'desc' }));
    });
  }

  openDeleteBoardDialog(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    const $ = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.store.dispatch(deleteBoardData({ boardId: this.boardId }));
        this.router.navigateByUrl(boardsRoute);
      }

      $.unsubscribe();
    });
  }

  openDeleteColumnDialog(columnId: string): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    const $ = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.store.dispatch(deleteColumnData({ boardId: this.boardId, columnId }));
        this.router.navigateByUrl(`${boardsRoute}/${this.boardId}`);
      }

      $.unsubscribe();
    });
  }

  onNewBoardClick(): void {
    this.headerService.newBoardClick();
  }

  onAddColumnClick(): void {
    this.headerService.newColumnClick();
  }

  onDeleteBoardClick(): void {
    this.openDeleteBoardDialog();
  }

  onBoardSelected(event: any): void {
    this.boardId = event.options[0].value;
    this.store.dispatch(loadColumnsData({ boardId: this.boardId }));

    this.router.navigateByUrl(`${boardsRoute}/${this.boardId}`);
  }

  openCreateColumnDialog(): void {
    const dialogRef = this.dialog.open(CreateColumnComponent, {
      width: '250px',
      data: { title: '' },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.createColumnInProgress = false;

      if (data) {
        this.columnsData$.pipe(
          take(1),
          map((columns: IColumnState[]) => {
              let maxOrder = 0;
              // find max column order for given boardId
              if (columns.length > 0) maxOrder = Math.max(...columns.map((c) => c.order));

              this.store.dispatch(createColumnData({
                boardId: this.boardId,
                title: data,
                order: maxOrder + 1,
              }));
            }),
        ).subscribe();
      }
    });
  }
}
