import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import {
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
    selector: 'app-info-dialog',
    templateUrl: './info-dialog.component.html',
    styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {
    private _message: string = '';

    constructor(
        private dialogRef: MatDialogRef<InfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.message = data.message;
    }

    ngOnInit(): void {
    }

    public get message(): string {
        return this._message;
    }
    public set message(mes: string) {
        this._message = mes;
    }
    close() {
        this.dialogRef.close();
    }

}





