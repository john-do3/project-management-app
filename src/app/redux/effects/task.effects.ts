import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import {
 map, catchError, switchMap,
} from 'rxjs/operators';
import { TasksService } from '../../board/services/tasks.service';
import * as TaskActions from '../actions/task.actions';
import * as ColumnActions from '../actions/column.actions';
import { taskUpdated } from '../actions/task.actions';

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
        done: action.done,
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

  deleteTask = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteTaskAction),
    switchMap((action) => this.tasksService
      .deleteTask(action.boardId, action.columnId,action.taskId)
      .pipe(
        map(() => TaskActions.deleteTaskData({ taskId: action.taskId })),
        catchError(async (error) => ColumnActions.apiCallFailed(error)),
      )),
  ));

  updateTask = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.updateTaskData),
    switchMap((action) => this.tasksService
      .updateTask(action.task.boardId, action.task.columnId, action.task.id,{
        columnId: action.task.columnId,
        boardId: action.task.boardId,
        title: action.task.title,
        order: action.task.order,
        done: action.task.done,
        description: action.task.description,
        userId: action.task.userId,
      })
      .pipe(
        map((task) => TaskActions.taskUpdated({task})),
        catchError(async (error) => TaskActions.apiCallFailed(error)),
      )),
  ));
}
