import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { IRestaurantRegistrationRequest } from 'src/app/model/auth/AuthDTO';
import { PasswordErrorStateMatcher } from '../_helper/PasswordErrorStateMatcher';
import { RestaurantType } from '../../model/auth/AuthDTO';

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


	restaurantTypes: RestaurantType[] = [
		{value: 0, viewValue: 'Alles'},
		{value: 1, viewValue: 'Italienisch'},
		{value: 2, viewValue: 'Asiatisch'},
		{value: 3, viewValue: 'Türkisch'},
		{value: 4, viewValue: 'Mexikanisch'},
		{value: 5, viewValue: 'Deutsch'},
		{value: 6, viewValue: 'Burger'},
	  ];
	
	isError = false;

	matcher = new PasswordErrorStateMatcher();

	createForm = this.fb.group(
		{
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			passwordRepeat: [''],
			phoneNumber: [null as number, Validators.required],
			restaurantType: ['', Validators.required],
			latitude: [null as number, Validators.required],
			longitude: [null as number, Validators.required],
			street: [''],
			houseNumber:[''],
			zip: [null as number],
			city: [''],
			country: [''],
			deliveryCost: [null as number],
		},
		{ validator: this.checkPasswords }
	);

	async register() {
		let user = new IRestaurantRegistrationRequest();

    	//Required parameters
    	user.name = this.createForm.get('name').value;
		user.email = this.createForm.get('email').value;
		user.password = this.createForm.get('password').value;
    	user.phoneNumber = this.createForm.get('phoneNumber').value;
    	user.restaurantType = this.createForm.get('restaurantType').value;
		user.latitude = this.createForm.get('latitude').value;
		user.longitude = this.createForm.get('longitude').value;
		
    	//Optional parameters
		user.street = this.createForm.get('street').value;
		user.houseNumber = this.createForm.get('houseNumber').value;
		user.zip = this.createForm.get('zip').value;
		user.city = this.createForm.get('city').value;
		user.country = this.createForm.get('country').value;
		user.deliveryCost = this.createForm.get('deliveryCost').value;

		try {
			await this.authService.registerRestaurant(user);
			this.router.navigate(['../login/restaurant-login']);
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