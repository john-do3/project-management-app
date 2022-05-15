import { createAction, props } from '@ngrx/store';
import { ICurrentUserState } from '../state-models';

export const addCurrentUserData = createAction(
  '[Header] AddTask',
  props<{
    currentTime: number
  }>(),
);

export const deleteCurrentUserData = createAction(
  '[Header] Delete currentUser data',
);
