import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IColumn } from '../state-models';


export const selectColumns = createFeatureSelector <{ columns: IColumn[] }>('columns');

export const selectColumnId = createSelector(
  selectColumns,
  (columns) => columns.columns.map((column) => column.id),
);
