import { createAction, props } from '@ngrx/store';
import { IColumnState } from '../state-models';

export const addColumnAction = createAction(
  '[Main Page] AddBoard',
  props<{
    column: IColumnState
  }>(),
);
