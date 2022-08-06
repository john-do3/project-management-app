import { createAction, props } from '@ngrx/store';
import { UpdateColumnDto } from 'src/app/shared/models/updateColumnDto';
import { IColumnState } from '../state-models';

export const loadColumnData = createAction(
  '[Main Page] Load column data',
  props<{ boardId:string, columnId: string }>(),
);

export const loadColumnsData = createAction(
  '[Main Page] Load all columns data',
  props<{ boardId: string }>(),
);

export const columnDataLoaded = createAction(
  '[Main Page] Column data loaded',
  props<{ column: IColumnState }>(),
);

export const columnsDataLoaded = createAction(
  '[Main Page] All columns data loaded',
  props<{ columns: ReadonlyArray<IColumnState> }>(),
);

export const deleteColumnData = createAction(
  '[Main Page] Delete column data',
  props<{ boardId: string, columnId: string }>(),
);

export const columnDeleted = createAction(
  '[Main Page] Column data deleted',
  props<{ columnId: string }>(),
);

export const updateColumn = createAction(
  '[Main Page] Update column data',
  props<{ boardId: string, columnId: string, updateColumn: UpdateColumnDto }>(),
);

export const columnUpdated = createAction(
  '[Main Page] Column data updated',
  props<{ column: IColumnState }>(),
);

export const createColumnData = createAction(
  '[Main Page] Create column data',
  props<{ boardId: string, title: string, order: number }>(),
);

export const columnCreated = createAction(
  '[Main Page] Column data created',
  props<{ column: IColumnState }>(),
);

export const apiCallFailed = createAction(
  '[Main Page] Columns api call failed',
  props<{ error: any }>(),
);

export const columnsReset = createAction(
  '[Main Page] Columns data reset',
);
