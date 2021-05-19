import { RestaurantLoginComponent } from './restaurant-login/restaurant-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginShellComponent } from './login-shell/login-shell.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DeleteRestaurantComponent } from './delete-restaurant/delete-restaurant.component';
import { RestaurantRegisterComponent } from './restaurant-register/restaurant-register.component';

@NgModule({
	declarations: [
		LoginShellComponent,
		LoginComponent,
		RegisterComponent,
		ResetComponent,
		RestaurantLoginComponent,
		DeleteRestaurantComponent,
		RestaurantRegisterComponent,
	],
	imports: [
		CommonModule,
		LoginRoutingModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
	],
})
export class LoginModule {}