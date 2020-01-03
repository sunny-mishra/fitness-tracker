import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { UIService } from "src/app/shared/ui.service";
import * as fromTraining from "../training.reducer";
import * as fromRoot from "../../app.reducer";

export interface ExerciseData {
  name: string;
  duration: number;
  calories: number;
}

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>; // The $ sign is just convention for variables controlled by NgRx

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.fetchExercises();
  }

  fetchExercises = () => {
    this.trainingService.fetchAvailableExercises();
  };

  onStartTraining = (form: NgForm) =>
    this.trainingService.startExercise(form.value.exercise);
}
