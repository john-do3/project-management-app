import {
  Component, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSelectionList } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  map, Subscription, take,
} from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';
import { loadBoardsData } from 'src/app/redux/actions/board.actions';
import { loadUsersData } from 'src/app/redux/actions/user.actions';
import { selectBoards } from 'src/app/redux/selectors/board.selector';
import {
 AppState, IBoardState, IColumnState, ITaskState,
} from 'src/app/redux/state-models';
import { boardsRoute } from 'src/app/project.constants';
import { ConfirmModalComponent } from 'src/app/shared/pages/confirm-modal/confirm-modal.component';
import { BoardService } from 'src/app/core/services/board.service';
import { selectColumns } from 'src/app/redux/selectors/column.selector';
import {
  createColumnData,
  deleteColumnData,
  loadColumnsData,
} from 'src/app/redux/actions/column.actions';
import { IColumn } from 'src/app/shared/models/createColumnDto';
import { createTaskAction, deleteTaskAction, updateTaskData } from 'src/app/redux/actions/task.actions';
import { selectUsers } from 'src/app/redux/selectors/user.selector';
import { UserService } from 'src/app/core/services/user.service';
import {
  createBoardData,
  deleteBoardData,
} from '../../../redux/actions/board.actions';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { TasksService } from '../../../core/services/tasks.service';
import { CreateColumnComponent } from '../create-column/create-column.component';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {
  boardId!: string;

  boardTitle!: string;

  boardDesc!: string;

  createBoardInProgress = false;

  createColumnInProgress = false;

  boards!: IBoardState[];

  @ViewChild('drawer', { static: true })
  sidenav!: MatSidenav;

  @ViewChild('boardsList', { static: true })
  boardsList!: MatSelectionList;

  boardsData$ = this.store.select(selectBoards);

  columnsData$ = this.store.select(selectColumns);

  usersData$ = this.store.select(selectUsers);

  private subscriptions = new Subscription();

  constructor(
    private headerService: HeaderService,
    private boardService: BoardService,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private taskService: TasksService,
    private userService: UserService,
  ) {
    this.boardId = activateRoute.snapshot.params['id'];
    if (this.boardId) this.store.dispatch(loadColumnsData({ boardId: this.boardId }));
  }

  ngOnInit(): void {
    this.subscribeActions();
    this.store.dispatch(loadUsersData());
    this.sidenav.toggle();
    this.store.dispatch(loadBoardsData());

    this.store.subscribe((state: AppState) => {
      if (state.boards.boards.length > 0) {
        const board = state.boards.boards.find((b) => b.id === this.boardId);
        if (board) {
          this.boardTitle = board.title;
          this.boardDesc = board.description;
        }
      }
    });
  }

  subscribeActions(): void {
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
      this.boardService.DeleteColumnClicked.subscribe((columnId) => {
        this.openDeleteColumnDialog(columnId);
      }),
    );

    this.subscriptions.add(
      this.taskService.NewTaskClicked.subscribe((column: IColumn) => {
        this.openCreateTaskDialog(column);
      }),
    );

    this.subscriptions.add(
      this.taskService.EditTaskClicked.subscribe((task: ITaskState) => {
        this.openEditTaskDialog(task);
      }),
    );

    this.subscriptions.add(
      this.taskService.DeleteTaskClicked.subscribe((task: ITaskState) => {
        this.openDeleteTaskDialog(task);
      }),
    );

    this.subscriptions.add(
      this.boardService.SideNavMenuClicked.subscribe(() => {
        this.sidenav.toggle();
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

    dialogRef.afterClosed().subscribe((data) => {
      this.createBoardInProgress = false;

      if (data) this.store.dispatch(createBoardData({ title: data.title, description: data.description }));
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

  onDeleteBoardClick(): void {
    this.openDeleteBoardDialog();
  }

  onBoardSelected(event: any): void {
    this.boardId = event.options[0].value.id;
    this.boardTitle = event.options[0].value.title;

    this.store.dispatch(loadColumnsData({ boardId: this.boardId }));

    this.router.navigateByUrl(`${boardsRoute}/${this.boardId}`);
  }

  openCreateTaskDialog(column: IColumn): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: { title: '', description: '' },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.store.dispatch(createTaskAction({
          boardId: column.boardId,
          columnId: column.columnId,
          description: data.description,
          order: 0, // todo
          done: false,
          title: data.title,
          userId: data.userId,
        }));
      }
    });
  }

  openEditTaskDialog(task: ITaskState) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: { title: task.title, description: task.description, userId: task.userId },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.store.dispatch(updateTaskData({
          task: {
            id: task.id,
            boardId: task.boardId,
            columnId: task.columnId,
            description: data.description,
            order: task.order,
            done: task.done,
            title: data.title,
            userId: data.userId,
          },
        }));
      }
    });
  }

  openDeleteTaskDialog(task: ITaskState): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    const $ = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.store.dispatch(deleteTaskAction({ boardId: task.boardId, columnId: task.columnId, taskId: task.id }));
        this.router.navigateByUrl(`${boardsRoute}/${this.boardId}`);
      }

      $.unsubscribe();
    });
  }
}
