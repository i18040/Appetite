import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { IRestaurantRegistrationRequest } from 'src/app/model/auth/AuthDTO';
import { RestaurantType } from '../../model/auth/AuthDTO';
import { GeoService } from 'src/app/service/geo.service';
import { INewProduct } from 'src/app/model/restaurant/newProduct';
import { RestaurantapiService } from 'src/app/service/restaurantapi.service';


@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private api: RestaurantapiService,
    ) { }

    private logo: any;

    newProductForm = this.fb.group(
        {
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            // Ingredients: ['', Validators.required],
        }
    )

    selectedFile: File = null;
    showWarningLogo: boolean = false;
    logoUrl;

    ngOnInit(): void {
    }

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

    async uploadProduct() {
        let product: INewProduct = {
            Name: this.newProductForm.get('name').value,
            Description: this.newProductForm.get('description').value,
            Price: this.newProductForm.get('price').value,
            Ingredients: null,
            RestaurantEmail: null,
            Pictures: this.selectedFile,
        }

        try {
            await this.api.postNewProduct(product);
            console.log('added new Product');
        } catch (err) {
            console.error('Error while sending product request', err);
        }
    }

}
