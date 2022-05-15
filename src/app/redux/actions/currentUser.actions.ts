import { createAction, props } from '@ngrx/store';
import { ICurrentUserState } from '../state-models';

export const addCurrentUserData = createAction(
  '[Header] AddCurrentUserData',
  props<{
    currentTime: number
  }>(),
);

export const deleteCurrentUserData = createAction(
  '[Header] Delete currentUser data',
);
