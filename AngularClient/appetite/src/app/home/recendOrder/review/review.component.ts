import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormatInputPathObject } from 'node:path';
import { OrderService } from 'src/app/service/order.service';
import { WebcamImage } from 'ngx-webcam';
import { ActivatedRoute, Router } from '@angular/router';
import { IRestaurant } from 'src/app/model/orderProcess/restaurant';
import { IOrder } from 'src/app/model/orderProcess/order';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from 'src/app/service/review.service';

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
    order: IOrder;
    private dialogRef: MatDialogRef<InfoDialogComponent>;

    constructor(
        private fb: FormBuilder,
        private orderService: OrderService,
        private reviewService: ReviewService,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.order = this.orderService.selectedOrder;
    }

    handleImage(webcamImage: WebcamImage) {
        this.webcamImage = webcamImage;
    }


    openDialog(message: string) {
        this.dialogRef = this.dialog.open(InfoDialogComponent, {
            data: { message: message },
        });
    }

    async sendReview() {
        try {
            this.reviewService.sendReview(
                this.order.restaurant.email,
                this.reviewForm.get('text').value,
                this.reviewForm.get('rating').value,
                this.webcamImage);
            this.openDialog('Successfully send a Review for ' + this.order.restaurant.name);
            this.router.navigate(['/home']);
        } catch (err) {
            console.error(err);
            this.openDialog('Something went wrong, try again later');
        }
    }

    abort() {
        this.router.navigate(['../history'], { relativeTo: this.route });
    }
}