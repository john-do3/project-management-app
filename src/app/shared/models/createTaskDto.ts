export interface ICreateTaskDto {
  title: string;
  description: string;
}

export type TaskFormInput = keyof ICreateTaskDto;

export enum FormConfig {
  required = 'required',
  minLength = 'minlength',
  maxLength = 'maxlength',
}
