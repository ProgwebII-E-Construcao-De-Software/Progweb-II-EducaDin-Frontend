import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-goals-share-dialog',
  templateUrl: './goals-share-dialog.component.html',
  styleUrl: './goals-share-dialog.component.scss'
})
export class GoalsShareDialogComponent implements OnInit {


    constructor(
        public dialogRef: MatDialogRef<GoalsShareDialogComponent>,
    ) {
    }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }

}
