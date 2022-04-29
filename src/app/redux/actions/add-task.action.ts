import { createAction, props } from '@ngrx/store';
import { ITask } from '../state-models';

export const addTaskAction = createAction(
  '[Main Page] AddBoard',
  props<{
    task: ITask
  }>(),
);
