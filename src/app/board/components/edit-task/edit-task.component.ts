import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormConfig, ICreateTaskDto, TaskFormInput } from '../../../shared/models/createTaskDto';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICreateTaskDto,
    private formBuilder: FormBuilder,
    private readonly store: Store,
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
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
    if (this.description.hasError(FormConfig.required)) {
      return 'Please enter a description';
    }

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

  ngOnInit(): void {
    this.formGroup.setValue(this.data)
  }
}
