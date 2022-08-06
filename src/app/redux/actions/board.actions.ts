import { createAction, props } from '@ngrx/store';
import { IBoardState } from '../state-models';

export const loadBoardData = createAction(
  '[Main Page] Load board data',
  props<{ boardId: string }>(),
);

export const loadBoardsData = createAction(
  '[Main Page] Load all boards data',
);

export const boardDataLoaded = createAction(
  '[Main Page] Board data loaded',
  props<{ board: IBoardState }>(),
);

export const boardsDataLoaded = createAction(
  '[Main Page] All boards data loaded',
  props<{ boards: ReadonlyArray<IBoardState> }>(),
);

export const deleteBoardData = createAction(
  '[Main Page] Delete board data',
  props<{ boardId: string }>(),
);

export const boardDeleted = createAction(
  '[Main Page] Board data deleted',
  props<{ boardId: string }>(),
);

export const createBoardData = createAction(
  '[Main Page] Create board data',
  props<{ title: string, description: string }>(),
);

export const boardCreated = createAction(
  '[Main Page] Board data created',
  props<{ board: IBoardState }>(),
);

export const apiCallFailed = createAction(
  '[Main Page] Boards api call failed',
  props<{ error: any }>(),
);

export const boardsReset = createAction(
  '[Main Page] Board data reset',
);
