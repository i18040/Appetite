import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { IRestaurantRegistrationRequest } from 'src/app/model/auth/AuthDTO';
import { PasswordErrorStateMatcher } from '../_helper/PasswordErrorStateMatcher';
import { RestaurantType } from '../../model/auth/AuthDTO';
import { GeoService } from 'src/app/service/geo.service';
import { IGeoLocation } from 'src/app/model/geo/geoLocation';

@Component({
    selector: 'app-restaurant-register',
    templateUrl: './restaurant-register.component.html',
    styleUrls: ['./restaurant-register.component.scss']
})

export class RestaurantRegisterComponent {
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private geo: GeoService,
    ) { }

    restaurantTypes: RestaurantType[] = [
        { value: 0, viewValue: 'All' },
        { value: 1, viewValue: 'Italian' },
        { value: 2, viewValue: 'Asian' },
        { value: 3, viewValue: 'Turkish' },
        { value: 4, viewValue: 'Mexican' },
        { value: 5, viewValue: 'German' },
        { value: 6, viewValue: 'Burger' },
    ];

    private logo: any;
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
            houseNumber: [''],
            zip: [null as number],
            city: [''],
            country: [''],
            deliveryCost: [null as number],
        },
        { validator: this.checkPasswords }
    );

    selectedFile: File = null;
    showWarningLogo: boolean = false;
    logoUrl;

    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
        this.validateLogo();
        console.log(this.selectedFile.size);
    }

    validateLogo() {
        if (this.selectedFile && this.selectedFile.size >= 1000000) {
            this.showWarningLogo = true;
            console.log("file too big, size is " + this.selectedFile.size + 'Bytes');
        } else {
            this.showWarningLogo = false;
            var reader = new FileReader();
            reader.readAsDataURL(this.selectedFile);
            reader.onload = (event) => {
                this.logoUrl = event.target.result;
            }
        }
    }

    async getLocation() {
        const loc: IGeoLocation = await this.geo.getGeoLocation();
        this.createForm.get('latitude').setValue(loc.lat);
        this.createForm.get('longitude').setValue(loc.lng);
    }

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
        user.logo = this.selectedFile;

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
