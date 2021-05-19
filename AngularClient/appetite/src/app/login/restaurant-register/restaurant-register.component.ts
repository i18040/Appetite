import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { IRestaurantRegistrationRequest } from 'src/app/model/auth/AuthDTO';
import { PasswordErrorStateMatcher } from '../_helper/PasswordErrorStateMatcher';

@Component({
  selector: 'app-restaurant-register',
  templateUrl: './restaurant-register.component.html',
  styleUrls: ['./restaurant-register.component.scss']
})

export class RestaurantRegisterComponent {
  constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {}

  isError = false;

	matcher = new PasswordErrorStateMatcher();

	createForm = this.fb.group(
		{
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			passwordRepeat: [''],

		},
		{ validator: this.checkPasswords }
	);

	async register() {
		  let user: IRestaurantRegistrationRequest;

      //Required parameters
      user.name = this.createForm.get('name').value;
		  user.email = this.createForm.get('email').value;
			user.password = this.createForm.get('password').value;
      user.phoneNumber = this.createForm.get('phoneNumber').value;
      user.restaurantType = this.createForm.get('restaurantType').value;

      //Optional parameters

		try {
			await this.authService.registerRestaurant(user);
			this.router.navigate(['../login/restaurant']);
		} catch (err) {
			console.error('Error while sending restaurant registration request', err);
			this.isError = true;
		}
	}

	checkPasswords(group: FormGroup) {
		const pass = group.get('password').value;
		const confirmPass = group.get('passwordRepeat').value;

		return pass === confirmPass ? null : { notSame: true };
	}
}
