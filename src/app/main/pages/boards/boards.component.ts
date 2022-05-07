import {
  Component, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatList } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';
import { loadBoardsData } from 'src/app/redux/actions/board.actions';
import { loadUsersData } from 'src/app/redux/actions/user.actions';
import { selectBoards } from 'src/app/redux/selectors/board.selector';
import { IBoardState } from 'src/app/redux/state-models';
import { boardsRoute } from 'src/app/project.constants';
import { ConfirmModalComponent } from 'src/app/shared/pages/confirm-modal/confirm-modal.component';
import {
  createBoardData,
  deleteBoardData,
} from '../../../redux/actions/board.actions';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { TasksService } from '../../../board/services/tasks.service';
import { CreateTaskComponent } from '../../../board/components/create-task/create-task.component';
import { addTaskAction } from '../../../redux/actions/add-task.action';

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

  @ViewChild('boardsList', { static: true })
  boardsList!: MatList;

  boardsData$ = this.store.select(selectBoards);

  private subscriptions = new Subscription();

  constructor(
    private headerService: HeaderService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private taskService: TasksService,
  ) {
    this.boardId = activateRoute.snapshot.params['id'];
    // this.boardsList. = this.boardId;
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
      this.headerService.GetBoardsClicked.subscribe((val) => {
        this.boards = val;
      }),
    );

    // my
    this.taskService.NewTaskClicked.subscribe(() => {
        this.openCreateTaskDialog();
    });

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

      if (data) this.store.dispatch(createBoardData({ title: data }));
    });
  }

  openDeleteBoardDialog(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    const $ = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.store.dispatch(deleteBoardData({ boardId: this.boardId }));
        $.unsubscribe();
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

// my
  onNewTaskClick(): void {
    this.taskService.newTaskClick();
  }

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '250px',
      data: { title: '', description: '' },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) this.store.dispatch(addTaskAction({ task: data }));
    });
  }
}
