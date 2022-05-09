import { createReducer, on } from '@ngrx/store';
import { IColumnState } from '../state-models';
import * as ColumnActions from '../actions/column.actions';

export interface State {
  columns: IColumnState[],
  error: any
}
export const InitialState: State = { columns: [], error: null };

export const columnReducer = createReducer(
  InitialState,

  on(ColumnActions.columnCreated, (state, { column }): State => ({
    ...state,
    columns: [...state.columns, column],
    error: null,
  })),

  on(ColumnActions.columnsDataLoaded, (state, { columns }): State => {
    const array = [...columns].sort((n1, n2) => (n1.order < n2.order ? -1 : 1));

    return {
      ...state,
      columns: [...array],
      error: null,
    };
  }),

  on(ColumnActions.columnDeleted, (state, { columnId }) => ({
    ...state,
    columns: [...state.columns.filter((c) => c.id !== columnId)],
    error: null,
  })),

  on(ColumnActions.columnUpdated, (state, { column }) => {
    let index = -1;
    const colToEdt = state.columns.find((c) => c.id === column.id);
    const newCols = [...state.columns];

    if (colToEdt) {
      index = state.columns.indexOf(colToEdt);

      if (index > -1) newCols[index] = column;
    }
      return {
        ...state,
        columns: [...newCols],
        error: null,
      };
  }),

  on(ColumnActions.apiCallFailed, (state, { error }): State => ({
    ...state,
    columns: [...state.columns],
    error,
  })),

);
