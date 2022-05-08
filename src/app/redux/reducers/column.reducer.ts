import { createReducer, on } from '@ngrx/store';
import { IColumnState } from '../state-models';
import * as ColumnActions from '../actions/column.actions';

export interface State {
  columns: IColumnState[],
  error: any
}
export const InitialState:State = { columns: [], error: null };

export const columnReducer = createReducer(
  InitialState,

  on(ColumnActions.columnCreated, (state, { column }): State => ({
    ...state,
    columns: [...state.columns, column],
    error: null,
  })),

  on(ColumnActions.columnsDataLoaded, (state, { columns }): State => ({
    ...state,
    columns: [...columns],
    error: null,
  })),

  /*on(ColumnActions.columnDeleted, (state, { boardId }) => ({
    ...state,
    boards: [...state.columns.filter((b) => b.id !== boardId)],
    error: null,
  })),*/

  on(ColumnActions.apiCallFailed, (state, { error }): State => ({
    ...state,
    columns: [...state.columns],
    error,
  })),

);
