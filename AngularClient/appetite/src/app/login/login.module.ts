import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginShellComponent } from './login-shell/login-shell.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [LoginShellComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatButtonModule
  ]
})
export class LoginModule { }
