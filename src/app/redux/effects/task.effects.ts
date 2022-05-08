import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { TasksService } from '../../board/services/tasks.service';
import * as TaskActions from '../actions/task.actions';
import * as ColumnActions from '../actions/column.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasksAction),
    mergeMap((action) => this.tasksService.loadTasks(action.boardId, action.columnId)
      .pipe(
        map((tasks) => (
          TaskActions.tasksDataReceivedAction({tasks: tasks})
        )),
        catchError((err) => of(TaskActions.apiCallFailed(err))),
      )),
  ));

  createTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.createTaskAction),
    switchMap((action) => this.tasksService.createTask(
      action.boardId,
      action.columnId,
      action.order, {
        title: action.title,
        description: action.description,
      })
      .pipe(
        map((createColumnResponse) => ColumnActions.columnCreated({ column: createColumnResponse })),
        catchError(async (error) => ColumnActions.apiCallFailed(error)),
      )),
  ));

  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
  ) {
  }
}
