import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoardState } from '../state-models';

export const selectBoardsObject = createFeatureSelector <{ boards: IBoardState[] }>('boards');

export const selectBoards = createSelector(
  selectBoardsObject,
  (boards) => boards.boards,
);

export const selectBoardId = createSelector(
  selectBoardsObject,
  (boards) => boards.boards.map((board) => board.id),
);
