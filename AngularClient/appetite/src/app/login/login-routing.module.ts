import { RestaurantRegisterComponent } from './restaurant-register/restaurant-register.component';
import { DeleteRestaurantComponent } from './delete-restaurant/delete-restaurant.component';
import { RestaurantLoginComponent } from './restaurant-login/restaurant-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginShellComponent } from './login-shell/login-shell.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
	{
		path: '',
		component: LoginShellComponent,
		children: [
			{
				path: '',
				component: LoginComponent,
			},
			{
				path: 'register',
				component: RegisterComponent,
			},
			{
				path: 'reset',
				component: ResetComponent,
			},
			{
				path: 'restaurant-login',
				component: RestaurantLoginComponent,
			},
			{
				path: 'delete-restaurant',
				component: DeleteRestaurantComponent,
			},
			{
				path: 'restaurant-register',
				component: RestaurantRegisterComponent,
			}
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoginRoutingModule {}