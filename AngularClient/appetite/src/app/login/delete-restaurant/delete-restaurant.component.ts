import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-restaurant',
  templateUrl: './delete-restaurant.component.html',
  styleUrls: ['./delete-restaurant.component.scss']
})
export class DeleteRestaurantComponent{
	constructor(private authService: AuthService, private router: Router) {}

	mail = new FormControl('', [ Validators.required, Validators.email ]);
	showSuccess = false;

	wasDeleted = false;

	async reset() {
		try {
			await this.authService.deleteRestaurantAccount(this.mail.value);
			this.wasDeleted = true;
		} catch (err) {
			console.error('Error during account deletion request', err);
		}
	}
}