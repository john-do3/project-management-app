export interface ICreateTaskDto {
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
}

export type TaskFormInput = keyof ICreateTaskDto;

export enum FormConfig {
  required = 'required',
  minLength = 'minlength',
  maxLength = 'maxlength',
}
