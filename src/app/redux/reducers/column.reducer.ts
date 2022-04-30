import { createReducer, on } from '@ngrx/store';
import * as AddColumnAction from '../actions/add-column.action';
import { IColumnState } from '../state-models';

export interface State {
  columns: IColumnState[]
}
export const InitialState:State = { columns: [] };

export const columnReducer = createReducer(
  InitialState,
  on(AddColumnAction.addColumnAction, (state, { column }): State => ({
    ...state,
    columns: [...state.columns, column],
  })),
);
