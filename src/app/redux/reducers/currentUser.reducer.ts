import { createReducer, on } from '@ngrx/store';
import { ICurrentUserState } from '../state-models';
import * as CurrentUserActions from '../actions/currentUser.actions';

export interface State {
  currentUser: ICurrentUserState | null,
  error: any
}
export const InitialState: State = { currentUser: null, error: null };

export const currentUserReducer = createReducer(
  InitialState,

  on(CurrentUserActions.addCurrentUserData, (state, { currentTime }): State => ({
    ...state,
    currentUser: { TokenCreationTime: currentTime },
    error: null,
  })),

  on(CurrentUserActions.deleteCurrentUserData, (state):State => ({
    ...state,
    currentUser: null,
    error: null,
  })),
);
