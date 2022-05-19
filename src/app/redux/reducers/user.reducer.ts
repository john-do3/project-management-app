import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { IUserState } from '../state-models';

export interface State {
  users: IUserState[],
  error: any
}
export const InitialState:State = { users: [], error: null };

export const userReducer = createReducer(
  InitialState,

  on(UserActions.usersDataLoaded, (state, { users }): State => ({
      ...state,
      users: [...users],
      error: null,
    })),

  on(UserActions.apiCallFailed, (state, { error }): State => ({
    ...state,
    users: [...state.users],
    error,
  })),

);
