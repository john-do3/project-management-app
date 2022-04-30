export interface ITaskState {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string; // object?
  boardId: string; // object?
  columnId: string;
}

export interface IColumnState {
  id: string;
  title: string;
  order: number;
  tasks?: ITaskState[];
}

export interface IBoardState {
  id: string;
  title: string;
  columns?: IColumnState[]
}

export interface AppState {
  boards: IBoardState[];
  columns: IColumnState[];
  tasks: ITaskState[];
}
