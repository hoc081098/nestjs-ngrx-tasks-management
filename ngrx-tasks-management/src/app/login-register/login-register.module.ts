import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterComponent } from './login-register.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginRegisterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class LoginRegisterModule {
}
