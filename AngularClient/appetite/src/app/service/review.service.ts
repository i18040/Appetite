import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    sessUser = JSON.parse(sessionStorage.getItem('user'));

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * send a review to the API
     * @return Promise of http request
     */
    sendReview(restaurantEmail: string, description: string, rating: number, image: WebcamImage) {
        const picture: Blob = this.createPicture(image);
        const fd = new FormData();
        fd.append("userEmail", this.sessUser.email);
        fd.append("restaurantEmail", restaurantEmail);
        fd.append("text", description);
        fd.append("rating", <string><unknown>rating);
        fd.append("pictures", picture, ".png");
        return this.http.post(env.api.url + '/ReviewService', fd).pipe(
            retry(3),
            catchError((err) => {
                this.handleError(err);
                return throwError(err);
            })
        )
            .toPromise();
    }

    /**
     * changes WebcamImage dataURL to a file
     * @param image WebcamImage
     * @returns file
     */
    createPicture(image: WebcamImage): Blob {
        const dataURI = image.imageAsDataUrl;
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        // Return an observable with a user-facing error message.

        // return throwError(
        //   'Something bad happened; please try again later.');
    }
}