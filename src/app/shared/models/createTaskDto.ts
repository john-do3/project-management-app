export interface ICreateTaskDto {
  title: string;
  order: number
  description: string;
  userId: string,
}

export type TaskFormInput = keyof ICreateTaskDto;

export enum FormConfig {
  required = 'required',
  minLength = 'minlength',
  maxLength = 'maxlength',
}
