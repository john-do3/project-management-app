import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl, FormGroup, Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUsers } from 'src/app/redux/selectors/user.selector';
import { IUserState } from 'src/app/redux/state-models';
import { map, take } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { ICreateTaskDto } from '../../../shared/models/createTaskDto';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  editMode: boolean = false;

  usersData$ = this.store.select(selectUsers);

  allUsers: IUserState[] = [];

  taskForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.title, [Validators.required]),
    description: new FormControl(this.data.description, [Validators.required]),
    users: new FormControl(this.data.userId, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICreateTaskDto,
    private readonly store: Store,
    private userService: UserService,
  ) {
    this.editMode = data.title !== '';

    this.usersData$
      .pipe(
        take(1),
        map(
          (users: IUserState[]) => {
            this.allUsers = users;
          },
        ),
      ).subscribe();

    this.userService.getCurrentUserState()
      .pipe(
        take(1),
        map((userState) => {
          const userId = this.data.userId ? this.data.userId : userState?.id;
          this.taskForm.get('users')?.setValue(userId);
        }),
      ).subscribe();
  }

  getTitle(): string {
    return this.editMode ? 'Edit task' : 'Create new task';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    const title = this.taskForm.get('title');
    const description = this.taskForm.get('description');
    title?.markAsTouched();
    description?.markAsTouched();

    const taskData = {
      title: this.taskForm.get('title')?.value,
      description: this.taskForm.get('description')?.value,
      userId: this.taskForm.get('users')?.value,
    };

    if (taskData.title && taskData.description) this.dialogRef.close(taskData);
  }
}
