import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IColumnState } from '../state-models';

export const selectColumnsObject = createFeatureSelector <{ columns: IColumnState[] }>('columns');

export const selectColumns = createSelector(
  selectColumnsObject,
  (columns) => columns.columns,
);

export const selectColumnId = createSelector(
  selectColumnsObject,
  (columns) => columns.columns.map((column) => column.id),
);
