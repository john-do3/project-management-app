import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoard } from '../state-models';


export const selectBoards = createFeatureSelector <{ boards: IBoard[] }>('boards');

export const selectBoardId = createSelector(
  selectBoards,
  (boards) => boards.boards.map((board) => board.id),
);
