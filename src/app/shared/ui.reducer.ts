import { UIActions, ActionTypes } from "./ui.actions";

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case ActionTypes.START_LOADING:
      return {
        isLoading: true
      };
    case ActionTypes.STOP_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
