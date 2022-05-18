import { createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions/task.actions';
import { ITaskState } from '../state-models';

export interface State {
  tasks: ITaskState[],
  error: any
}

export const InitialState: State = { tasks: [], error: null };

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

  on(TaskActions.deleteTaskFromColumn, (state, { columnId }) => ({
    tasks: [...state.tasks.filter((task) => task.columnId !== columnId)],
    error: null,
  })),

  on(TaskActions.taskCreatedAction, (state, { task }): State => ({
    ...state,
    tasks: [...state.tasks, task],
    error: null,
  })),

  on(TaskActions.tasksDataReceivedAction, (state, { tasks }): State => {
    const union: ITaskState[] = [];

    tasks.forEach((element) => {
      if (!state.tasks.find((x) => x.id === element.id)) { union.push(element); }
      union.sort((task1, task2) => task1.order - task2.order);
    });

    return {
      ...state,
      tasks: [...state.tasks, ...union],
      error: null,
    };
  }),

  on(TaskActions.taskUpdated, (state, { task }): State => ({
    ...state,
    tasks: [...state.tasks.filter((t) => t.id !== task.id), task],
    error: null,
  })),

  on(TaskActions.tasksDataUpdatedAction, (state, { tasks }): State => ({
      ...state,
      tasks: [...state.tasks
        .filter((t) => t.columnId !== tasks[0].columnId), ...tasks],
      error: null,

  })),

  on(TaskActions.apiCallFailed, (state, { error }): State => ({
    ...state,
    tasks: [...state.tasks],
    error,
  })),
);
