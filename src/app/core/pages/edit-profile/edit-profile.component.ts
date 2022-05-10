import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  editForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    login: new FormControl(this.data.login, [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      this.createPasswordStrengthValidator(),
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { name: string; login: string; password: string },
  ) {}

  onSubmit() {
    // TODO DELETE
    console.log('submit');
  }

  onEdit() {
    this.data = this.editForm.getRawValue();
    this.dialogRef.close(this.data);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      if (!value) {
        return null;
      }

      const isEnoughtLength = value.length >= 8;

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const hasSpecial = /[*@!#%&()^~{}]+/.test(value);

      const passwordValid = isEnoughtLength
        && hasUpperCase
        && hasLowerCase
        && hasNumeric
        && hasSpecial;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }
}
