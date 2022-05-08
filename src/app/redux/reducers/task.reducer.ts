import { createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions/task.actions';
import { ITaskState } from '../state-models';

export interface State {
  tasks: ITaskState[]
}
export const InitialState:State = { tasks: [] };

export const taskReducer = createReducer(
  InitialState,
  on(TaskActions.taskActions, (state, { task }): State => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TaskActions.deleteTaskData, (state, { taskId }) => ({
    tasks: [...state.tasks.filter((task) => task.id !== taskId)],
    error: null,
  })),
);
