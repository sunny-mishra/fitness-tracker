import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

import { StopTrainingComponent } from "./stop-training.component";
import { TrainingService } from "../training.service";
import * as fromTraining from "../training.reducer";

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"]
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.startOrResumeTime();
  }

  onFinish = () => {
    this.trainingService.completeExercise();
    clearInterval(this.timer);
  };

  startOrResumeTime() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(exercise => {
        const step = (exercise.duration / 100) * 1000;
        this.timer = window.setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.onFinish();
          }
        }, step);
      });
  }

  onStop = () => {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      result
        ? this.trainingService.cancelExercise(this.progress)
        : this.startOrResumeTime();
    });
  };
}
