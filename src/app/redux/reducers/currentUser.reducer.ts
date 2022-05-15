import { createReducer, on } from '@ngrx/store';
import { ICurrentUserState } from '../state-models';
import * as CurrentUserActions from '../actions/currentUser.actions';


export interface State {
  currentUser: ICurrentUserState | null,
  error: any
}
export const InitialState: State = { currentUser: null, error: null };

export const currentUsrReducer = createReducer(
  InitialState,

  on(CurrentUserActions.addCurrentUserData, (state, { currentUser }): State => ({
    ...state,
    currentUser: currentUser,
    error: null,
  })),

  on(CurrentUserActions.deleteCurrentUserData,(state):State => ({
    ...state,
    currentUser: null,
    error: null,
  }))
)
