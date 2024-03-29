export interface ITask {
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface ICreateTaskDto {
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
}

export interface IUpdateTaskDto extends ICreateTaskDto{
  boardId: string;
  columnId: string;
}

export type TaskFormInput = keyof ICreateTaskDto;

export enum FormConfig {
  required = 'required',
  minLength = 'minlength',
  maxLength = 'maxlength',
}
