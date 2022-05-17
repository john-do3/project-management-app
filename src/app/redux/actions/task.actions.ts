import { createAction, props } from '@ngrx/store';
import { ITaskState } from '../state-models';

export const taskActions = createAction(
  '[Main Page] AddTask',
  props<{
    task: ITaskState
  }>(),
);

export const deleteTaskData = createAction(
  '[Main Page] Delete task data',
  props<{ taskId: string }>(),
);

export const updateTaskData = createAction(
  '[Boards] Update task data',
  props<{ task: ITaskState }>(),
);

export const taskUpdated = createAction(
  '[Boards] Task data updated',
  props<{ task: ITaskState }>(),
);

export const loadTasksData = createAction(
  '[Boards] Load all tasks data',
);

export const loadTasksAction = createAction(
  '[Board] Get all tasks',
  props<{ boardId: string, columnId: string }>(),
);

export const tasksDataReceivedAction = createAction(
  '[Board] All tasks data received',
  props<{ tasks: ReadonlyArray<ITaskState> }>(),
);

export const taskDataReceivedAction = createAction(
  '[Board] Task data received',
  props<{ task: ITaskState }>(),
);

export const deleteTaskAction = createAction(
  '[Board] Delete task',
  props<{ boardId: string, columnId: string, taskId: string }>(),
);

export const createTaskAction = createAction(
  '[Board] Create task',
  props<{ boardId: string, columnId: string, title: string, done: boolean,
    order: number, description: string, userId: string }>(),
);

export const taskCreatedAction = createAction(
  '[Board] Task created',
  props<{ task: ITaskState }>(),
);

export const tasksDataUpdatedAction = createAction(
  '[Board] All tasks data updated',
  props<{ tasks: ReadonlyArray<ITaskState> }>(),
);


export const apiCallFailed = createAction(
  '[Board] Tasks api call failed',
  props<{ error: Error }>(),
);
