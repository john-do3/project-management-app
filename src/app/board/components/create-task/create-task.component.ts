import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormConfig, ICreateTaskDto, TaskFormInput } from '../../../shared/models/createTaskDto';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICreateTaskDto,
    private formBuilder: FormBuilder,
    private readonly store: Store,
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', Validators.maxLength(255)],
    });
  }

  public get title(): FormControl {
    return <FormControl> this.formGroup.get(<TaskFormInput>'title');
  }

  public get description(): FormControl {
    return <FormControl> this.formGroup.get(<TaskFormInput>'description');
  }

  public get getTitleErrorMessage() {
    if (this.title.hasError(FormConfig.required)) {
      return 'Please enter a title';
    }
    if (this.title.hasError(FormConfig.minLength)) {
      return 'The title is too short';
    }
    return this.title.hasError(FormConfig.maxLength) ? 'The title is too long' : '';
  }

  public get getDescriptionErrorMessage() {
    return this.description.hasError(FormConfig.maxLength) ? 'The description is too long' : '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    const taskData = {
      title: this.title.value,
      description: this.description.value,
    };
    if (this.formGroup.status === 'VALID') {
      this.dialogRef.close(taskData);
    }
  }
}
