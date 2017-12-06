import * as AuthActions from '../actions/auth.actions';

export type Action = AuthActions.All;
const initialState = {}
  
/// Reducer function
export function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case AuthActions.LOGIN_REQUESTED:
      return { ...state, loading: true };
    case AuthActions.LOGIN_SUCCESS:
      return { ...state,...action.payload, loading: false };
    case AuthActions.SIGNUP_REQUESTED:
      return { ...state, ...action.payload, loading: true };
    case AuthActions.SIGNUP_SUCCESS:
      return { ...state,...action.payload, loading: false };
    case AuthActions.LOGOUT_REQUESTED:
      return { ...state, loading: true };
    case AuthActions.LOGOUT_SUCCESS:
      return { ...state, loading: false };
    case AuthActions.AUTH_ERROR:
      return { ...state, ...action.payload, loading: true };
    default:
      return state;
  }
}
