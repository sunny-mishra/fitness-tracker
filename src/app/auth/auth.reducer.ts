import { AuthActions, ActionTypes } from "./auth.actions";

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case ActionTypes.SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
