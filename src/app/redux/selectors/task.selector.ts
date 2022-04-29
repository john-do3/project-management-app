import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITask } from '../state-models';

export const selectTasks = createFeatureSelector <{ tasks: ITask[] }>('tasks');

export const selectTasksId = createSelector(
  selectTasks,
  (tasks) => tasks.tasks.map((task) => task.id),
);

