import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store.module';
import { LoginUser, RegisterUser } from '../store/auth';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthDto } from '../model/auth';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  isLoginMode = true;
  hidePassword = true;

  readonly usernameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
  ]);
  readonly passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
  ]);

  constructor(
      private store: Store<AppState>,
      private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
  }

  submit() {
    if (!this.usernameControl.valid || !this.passwordControl.valid) {
      this.snackBar.open('Invalid email or password', undefined, { duration: 2000 });
      return;
    }

    const username = this.usernameControl.value;
    const password = this.passwordControl.value;
    const authDto: AuthDto = { username, password };

    if (this.isLoginMode) {
      this.store.dispatch(new LoginUser(authDto));
    } else {
      this.store.dispatch(new RegisterUser(authDto));
    }
  }

  getPasswordErrorMessage(): string {
    if (this.passwordControl.hasError('required')) {
      return 'You must enter password';
    }
    if (this.passwordControl.hasError('minlength')) {
      return 'Min length of password is 8';
    }
    if (this.passwordControl.hasError('maxLength')) {
      return 'Max length of password is 20';
    }
    return '';
  }

  getUsernameErrorMessage(): string {
    if (this.usernameControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.usernameControl.hasError('minLength')) {
      return 'Min length of username is 4';
    }
    if (this.usernameControl.hasError('maxLength')) {
      return 'Max length of username is 20';
    }
    return '';
  }
}
