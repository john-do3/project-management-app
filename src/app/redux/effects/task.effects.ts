import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map, catchError, switchMap, mergeMap,
} from 'rxjs/operators';
import { TasksService } from '../../core/services/tasks.service';
import * as TaskActions from '../actions/task.actions';
import * as ColumnActions from '../actions/column.actions';

@Injectable()
export class MovieEffects {
  loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType('[Column Component] Load Tasks'),
        mergeMap(() => this.tasksService.getTasks()
          .pipe(
            map((tasks) => (
              { type: '[Tasks API] Tasks Loaded Success', payload: tasks }
            )),
            catchError(() => of({ type: '[Tasks API] Tasks Loaded Error' })),
          )),
    ));

  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
  ) {
  }

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasksAction),
    mergeMap((action) => this.tasksService.loadTasks(action.boardId, action.columnId)
      .pipe(
        map((tasksResponse) => TaskActions.tasksDataReceivedAction({ tasks: tasksResponse })),
        catchError((err) => of(TaskActions.apiCallFailed(err))),
      )),
  ));

  createTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.createTaskAction),
    switchMap((action) => this.tasksService.createTask(action.boardId, action.columnId, {
      title: action.title,
      done: action.done,
      description: action.description,
      order: action.order,
      userId: action.userId,
    })
      .pipe(
        map((createTaskResponse) => TaskActions.taskCreatedAction({ task: createTaskResponse })),
        catchError(async (error) => TaskActions.apiCallFailed(error)),
      )),
  ));

  deleteTask = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteTaskAction),
    switchMap((action) => this.tasksService
      .deleteTask(action.boardId, action.columnId, action.taskId)
      .pipe(
        map(() => TaskActions.deleteTaskData({ taskId: action.taskId })),
        catchError(async (error) => ColumnActions.apiCallFailed(error)),
      )),
  ));

  updateTask = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.updateTaskData),
    switchMap((action) => this.tasksService
      .updateTask(action.task.boardId, action.task.columnId, action.task.id, {
        columnId: action.task.columnId,
        boardId: action.task.boardId,
        title: action.task.title,
        order: action.task.order,
        done: action.task.done,
        description: action.task.description,
        userId: action.task.userId,
      })
      .pipe(
        map((task) => TaskActions.taskUpdated({ task })),
        catchError(async (error) => TaskActions.apiCallFailed(error)),
      )),
  ));
}
