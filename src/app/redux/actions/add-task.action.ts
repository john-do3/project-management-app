import { createAction, props } from '@ngrx/store';
import { ITaskState } from '../state-models';

export const addTaskAction = createAction(
  '[Main Page] AddBoard',
  props<{
    task: ITaskState
  }>(),
);
