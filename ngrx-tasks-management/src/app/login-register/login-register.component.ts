import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store.module';
import { LoginUser } from '../store/auth';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.store.dispatch(new LoginUser({ username: 'Petrus', password: '123456@a' }));
  }

}
