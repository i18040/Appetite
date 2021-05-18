import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'mh-reset',
	templateUrl: './reset.component.html',
	styleUrls: ['./reset.component.scss'],
})
export class ResetComponent {
	constructor(private authService: AuthService, private router: Router) {}

	mail = new FormControl('', [ Validators.required, Validators.email ]);
	showSuccess = false;

	wasDeleted = false;

	async reset() {
		try {
			await this.authService.deleteAccount(this.mail.value);
			this.wasDeleted = true;
		} catch (err) {
			console.error('Error during account deletion request', err);
		}
	}
}
