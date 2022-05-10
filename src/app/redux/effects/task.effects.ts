import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { TasksService } from '../../board/services/tasks.service';
import * as TaskActions from '../actions/task.actions';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
  ) {
  }

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasksAction),
    switchMap((action) => this.tasksService.loadTasks(action.boardId, action.columnId)
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
      {
        title: action.title,
        description: action.description,
        order: action.order,
        userId: action.userId,
      })
      .pipe(
        tap((v) => {
          console.log(v);
        }),
        map((createTaskResponse) => TaskActions.taskCreatedAction({task: createTaskResponse})),
        catchError(async (error) => TaskActions.apiCallFailed(error)),
      )),
  ));
}
