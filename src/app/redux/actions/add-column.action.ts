import { createAction, props } from '@ngrx/store';
import { IColumn } from '../state-models';

export const addColumnAction = createAction(
  '[Main Page] AddBoard',
  props<{
    column: IColumn
  }>(),
);
