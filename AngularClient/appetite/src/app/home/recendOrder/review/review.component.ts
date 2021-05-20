import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormatInputPathObject } from 'node:path';
import { OrderService } from 'src/app/service/order.service';
import { WebcamImage } from 'ngx-webcam';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
    public ratingOptions: number[] = [0, 1, 2, 3, 4, 5];
    public reviewForm: FormGroup = this.fb.group({
        text: ['', Validators.required],
        rating: ['', Validators.required],
    });
    webcamImage: WebcamImage = null;

    constructor(
        private fb: FormBuilder,
        private orderService: OrderService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        // this.buildForm()
    }


    handleImage(webcamImage: WebcamImage) {
        this.webcamImage = webcamImage;
    }
    // buildForm() {
    //     this.reviewForm = 
    // }
    sendReview() {

        this.orderService.sendReview(
            this.reviewForm.get('text').value,
            this.reviewForm.get('rating').value,
            this.webcamImage);
        console.log(this.webcamImage);
    }

    abort() {
        this.router.navigate(['../history'], { relativeTo: this.route });
    }
}