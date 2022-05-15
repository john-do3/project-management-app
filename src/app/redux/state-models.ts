export interface ITaskState {
  id: string;
  title: string;
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
}

export interface IBoardState {
  id: string;
  title: string;
}

export interface IUserState {
  id: string;
  login: string;
  name: string;
}

export interface ICurrentUserState {
  TokenCreationTime: string
}

export interface AppState {
  boards: IBoardState[];
  columns: IColumnState[];
  tasks: ITaskState[];
  users: IUserState[];
  currentUser: ICurrentUserState;
}
