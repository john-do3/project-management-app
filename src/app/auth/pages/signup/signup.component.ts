import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { CreateUserDto } from 'src/app/shared/models/createUserDto.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name!: string;
  login!: string;
  password!: string;

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, this.createPasswordStrengthValidator()]),
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService
      .signUp({
        name: this.signUpForm.get('name')?.value,
        login: this.signUpForm.get('login')?.value,
        password: this.signUpForm.get('password')?.value
      })
      .subscribe(newUser => console.log(newUser.login));      

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

      const passwordValid = isEnoughtLength && hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

}
