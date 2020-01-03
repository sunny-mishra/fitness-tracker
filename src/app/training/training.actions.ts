import { Action } from "@ngrx/store";

import { Exercise } from "./exercise.model";

export const ActionTypes = {
  SET_AVAILABLE_TRAININGS: "[Training] Set Available Trainings",
  SET_FINISHED_TRAININGS: "[Training] Set Finished Trainings",
  START_TRAINING: "[Training] Start Training",
  STOP_TRAINING: "[Training] Stop Training"
};

class SetAvailableTrainings implements Action {
  readonly type = ActionTypes.SET_AVAILABLE_TRAININGS;
  constructor(public payload: Exercise[]) {} // This is how to set up an action that also has a payload
}

export class SetAvailableTrainingsWithPayload extends SetAvailableTrainings {
  payload: Exercise[];
}

class SetFinishedTrainings implements Action {
  readonly type = ActionTypes.SET_FINISHED_TRAININGS;
  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainingsWithPayload extends SetFinishedTrainings {
  payload: Exercise[];
}

class StartTraining implements Action {
  readonly type = ActionTypes.START_TRAINING;
  constructor(public payload: string) {}
}

export class StartTrainingWithPayload extends StartTraining {
  payload: string;
}

export class StopTraining implements Action {
  readonly type = ActionTypes.STOP_TRAINING;
  payload: null;
}

export type TrainingActions =
  | SetAvailableTrainingsWithPayload
  | SetFinishedTrainingsWithPayload
  | StartTrainingWithPayload
  | StopTraining;
