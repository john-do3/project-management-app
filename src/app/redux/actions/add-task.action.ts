import { createAction, props } from '@ngrx/store';
import { ITaskState } from '../state-models';

export const addTaskAction = createAction(
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
  '[Main Page] Update task data',
  props<{ taskId: string, columnId: string, order: number }>(),
);
