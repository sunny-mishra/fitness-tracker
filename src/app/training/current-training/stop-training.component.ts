import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

// MAT_DIALOG_DATA is some constant or ID that allows us to access the data
// that angular material internally stores when we call then open() method.
// It's basically a token.

@Component({
  selector: "app-stop-training",
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-content>
      <p>You only got {{ 100 - passedData.progress }}% left</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button color="warn" [mat-dialog-close]="true">
        Yes, stop it
      </button>
      <button mat-button color="primary" [mat-dialog-close]="false">
        No, continue
      </button>
    </mat-dialog-actions>
  `
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
