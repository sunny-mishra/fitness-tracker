import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { Exercise } from "./exercise.model";
import { UIService } from "../shared/ui.service";
import * as fromTraining from "./training.reducer";
import * as Training from "./training.actions";
import * as UI from "../shared/ui.actions";

export interface ExerciseData {
  name: string;
  duration: number;
  calories: number;
}

@Injectable()
export class TrainingService {
  private fbSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises = () => {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubscriptions.push(
      this.db
        .collection("availableExercises")
        .snapshotChanges()
        .pipe(
          map(docArray =>
            docArray.map(doc => {
              const data = doc.payload.doc.data() as ExerciseData;
              return {
                id: doc.payload.doc.id,
                ...data
              };
            })
          )
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(
              new Training.SetAvailableTrainingsWithPayload(exercises)
            );
          },
          error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(
              "Fetching exercises failed. Try again later.",
              null,
              3000
            );
          }
        )
    );
  };

  startExercise = (selectedId: string) => {
    // this.db
    //   .doc("availableExercises/" + selectedId)
    //   .update({ lastSelected: new Date() });
    // Above is how you can select a single document and update it. You can also
    // set, delete, and subscripe to valueChanges().
    this.store.dispatch(new Training.StartTrainingWithPayload(selectedId));
  };

  cancelExercise = (progress: number) => {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(exercise => {
        this.addDataToDatabase({
          ...exercise,
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100),
          date: new Date(),
          state: "cancelled"
        });
        this.store.dispatch(new Training.StopTraining());
      });
  };

  completeExercise = () => {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(exercise => {
        this.addDataToDatabase({
          ...exercise,
          date: new Date(),
          state: "completed"
        });
        this.store.dispatch(new Training.StopTraining());
      });
  };

  fetchCompletedOrCancelledExercises = () =>
    this.fbSubscriptions.push(
      this.db
        .collection("finishedExercises")
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(
            new Training.SetFinishedTrainingsWithPayload(exercises)
          );
        })
    );

  cancelSubscriptions = () =>
    this.fbSubscriptions.forEach(sub => sub.unsubscribe());

  private addDataToDatabase = (exercise: Exercise) => {
    this.db.collection("finishedExercises").add(exercise);
  };
}
