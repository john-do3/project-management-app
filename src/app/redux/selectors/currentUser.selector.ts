import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICurrentUserState } from '../state-models';

export const selectTasksObject = createFeatureSelector <{ currentUser: ICurrentUserState }>('currentUser');

export const selectTokenCreationTime = createSelector(
  selectTasksObject,
  ({ currentUser }) => currentUser.TokenCreationTime,
);
