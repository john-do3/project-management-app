import { createAction, props } from '@ngrx/store';
import { IBoard } from '../state-models';

export const addBoardAction = createAction(
  '[Main Page] AddBoard',
  props<{
    board: IBoard
  }>(),
);
