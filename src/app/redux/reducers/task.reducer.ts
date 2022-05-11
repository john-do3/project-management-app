import { createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions/task.actions';
import { ITaskState } from '../state-models';
import * as BoardActions from '../actions/board.actions';

export interface State {
  tasks: ITaskState[],
  error: any
}

export const InitialState: State = {tasks: [], error: null};

export const taskReducer = createReducer(
  InitialState,
  on(TaskActions.taskActions, (state, {task}): State => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TaskActions.deleteTaskData, (state, {taskId}) => ({
    tasks: [...state.tasks.filter((task) => task.id !== taskId)],
    error: null,
  })),



  on(TaskActions.taskCreatedAction, (state, {task}): State => ({
    ...state,
    tasks: [...state.tasks, task],
    error: null,
  })),

  on(TaskActions.tasksDataReceivedAction, (state, {tasks}): State => ({
    ...state,
    tasks: [...tasks],
    error: null,
  })),


  on(TaskActions.apiCallFailed, (state, {error}): State => ({
    ...state,
    tasks: [...state.tasks],
    error,
  })),
);
