import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from '../state-models';

export const selectUsersObject = createFeatureSelector <{ users: IUserState[] }>('users');

export const selectUsers = createSelector(
  selectUsersObject,
  (users) => users.users,
);

export const selectUserId = createSelector(
  selectUsersObject,
  (users) => users.users.map((user) => user.id),
);
