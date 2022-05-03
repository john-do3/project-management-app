import { createAction, props } from '@ngrx/store';
import { IColumnState } from '../state-models';

export const addColumnAction = createAction(
  '[Main Page] AddColumn',
  props<{
    column: IColumnState
  }>(),
);
