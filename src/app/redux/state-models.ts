export interface ITaskState {
  id: string;
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface IColumnState {
  id: string;
  title: string;
  order: number;
  // tasks?: ITaskState[];
}

export interface IBoardState {
  id: string;
  title: string;
  description: string;
  // columns?: IColumnState[]
}

export interface IUserState {
  id: string;
  login: string;
  name: string;
}

export interface AppBoardState {
  boards: IBoardState[];
  error: any;
}

export interface AppColumnState {
  columns: IColumnState[];
  error: any;
}

export interface AppTaskState {
  tasks: ITaskState[];
  error: any;
}

export interface AppUserState {
  users: IUserState[];
  error: any;
}

export interface AppState {
  boards: AppBoardState;
  columns: AppColumnState;
  tasks: AppTaskState;
  users: AppUserState;

}
