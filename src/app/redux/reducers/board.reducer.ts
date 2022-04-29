import { createReducer, on } from '@ngrx/store';
import * as AddBoardAction from '../actions/add-board.action';
import { IBoard } from '../state-models';

export interface State {
  boards: IBoard[]
}
export const InitialState:State = { boards: [] };

export const boardReducer = createReducer(
  InitialState,
  on(AddBoardAction.addBoardAction, (state, { board }): State => ({
    ...state,
    boards: [...state.boards, board],
  })),
);
