import { createAction, props } from '@ngrx/store';
import { IUserState } from '../state-models';

export const loadUsersData = createAction(
  '[Main Page] Load users data',
);

export const usersDataLoaded = createAction(
  '[Main Page] All users data loaded',
  props<{ users: ReadonlyArray<IUserState> }>(),
);

export const apiCallFailed = createAction(
  '[Main Page] Users api call failed',
  props<{ error: any }>(),
);
