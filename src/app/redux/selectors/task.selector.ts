import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskState } from '../state-models';

export const selectTasksObject = createFeatureSelector <{ tasks: ITaskState[] }>('tasks');

export const selectTasks = createSelector(
  selectTasksObject,
  (tasks) => tasks.tasks,
);

export const selectTasksId = createSelector(
  selectTasksObject,
  (tasks) => tasks.tasks.map((task) => task.id),
);
