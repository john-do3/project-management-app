import { createReducer, on } from '@ngrx/store';
import * as AddTaskAction from '../actions/add-task.action';
import { ITaskState } from '../state-models';

export interface State {
  tasks: ITaskState[]
}
export const InitialState:State = { tasks: [] };

export const taskReducer = createReducer(
  InitialState,
  on(AddTaskAction.addTaskAction, (state, { task }): State => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
);
