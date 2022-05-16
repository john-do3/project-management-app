import { createAction, props } from '@ngrx/store';

export const addCurrentUserData = createAction(
  '[Header] AddCurrentUserData',
  props<{
    currentTime: number
  }>(),
);

export const deleteCurrentUserData = createAction(
  '[Header] Delete currentUser data',
);
