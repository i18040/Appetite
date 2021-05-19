import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-login',
  templateUrl: './restaurant-login.component.html',
  styleUrls: ['./restaurant-login.component.scss']
})
export class RestaurantLoginComponent implements OnInit {
  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) { }

  error;

  form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
  });

  isLoading = false;


  ngOnInit() {
      this.form.valueChanges.subscribe(() => {
          this.error = undefined;
      });
  }

  async login() {
      this.error = undefined;
      this.isLoading = true;
      try {
          await this.authService.loginRestaurant(
              this.form.get('email').value,
              this.form.get('password').value
          );
          this.router.navigate(['/home']);
      } catch (err) {
          console.error('Error while logging in', err);
          this.error = err;
      } finally {
          this.isLoading = false;
      }
  }
}
