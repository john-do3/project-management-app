import { createAction, props } from '@ngrx/store';
import { IColumnState, ITaskState } from '../state-models';

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
  props<{ boardId: string, columnId: string, title: string,
    order: number, description: string, userId: string }>(),
);


export const taskCreatedAction = createAction(
  '[Board] Task created',
  props<{ task: ITaskState }>(),
);



