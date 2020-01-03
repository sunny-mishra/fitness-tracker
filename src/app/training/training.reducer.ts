import { TrainingActions, ActionTypes } from "./training.actions";

import { Exercise } from "./exercise.model";
import * as fromRoot from "../app.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case ActionTypes.SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case ActionTypes.SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case ActionTypes.START_TRAINING:
      return {
        ...state,
        activeTraining: state.availableExercises.find(
          exercise => exercise.id === action.payload
        )
      };
    case ActionTypes.STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>(
  "training" // has to match the identifier in forFeature()
);

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);

export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);

export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);

export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => !!state.activeTraining
);
