import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginShellComponent } from './login-shell/login-shell.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		LoginShellComponent,
		LoginComponent,
		RegisterComponent,
		ResetComponent,
	],
	imports: [
		CommonModule,
		LoginRoutingModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
	],
})
export class LoginModule {}