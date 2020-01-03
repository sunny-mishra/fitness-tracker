import { Action } from "@ngrx/store";

export const ActionTypes = {
  START_LOADING: "[UI] Start Loading",
  STOP_LOADING: "[UI] Stop Loading"
};

export class StartLoading implements Action {
  readonly type = ActionTypes.START_LOADING;
}

export class StopLoading implements Action {
  readonly type = ActionTypes.STOP_LOADING;
}

export type UIActions = StartLoading | StopLoading;
