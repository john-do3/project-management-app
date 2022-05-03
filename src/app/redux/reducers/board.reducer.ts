import { createReducer, on } from '@ngrx/store';
import * as BoardActions from '../actions/board.actions';
import { IBoardState } from '../state-models';

export interface State {
  boards: IBoardState[],
  error: any
}
export const InitialState:State = { boards: [], error: null };

export const boardReducer = createReducer(
  InitialState,

  on(BoardActions.boardCreated, (state, { board }): State => ({
    ...state,
    boards: [...state.boards, board],
    error: null,
  })),

  on(BoardActions.boardsDataLoaded, (state, { boards }) => {
    const union: IBoardState[] = [];
    boards.forEach((element) => {
      if (!state.boards.find((s) => s.id === element.id)) { union.push(element); }
    });

    return {
      ...state,
      boards: [...state.boards, ...union],
      error: null,
    };
  }),

  on(BoardActions.boardDeleted, (state, { boardId }) => ({
      // ...state,
      boards: [...state.boards.filter((b) => b.id !== boardId)],
      error: null,
  })),

  on(BoardActions.apiCallFailed, (state, { error }): State => ({
    ...state,
    boards: [...state.boards],
    error,
  })),

);
