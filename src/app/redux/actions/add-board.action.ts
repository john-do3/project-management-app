import { createAction, props } from '@ngrx/store';
import { IBoardState } from '../state-models';

export const addBoardAction = createAction(
  '[Main Page] AddBoard',
  props<{
    board: IBoardState
  }>(),
);
