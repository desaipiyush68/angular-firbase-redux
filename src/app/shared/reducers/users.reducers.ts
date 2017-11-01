import * as UserActions from '../actions/users.actions';
import { User } from '../services/model/users';
export type Action = UserActions.All;


/// Reducer function
export function userReducer(state = User, action: Action) {
  switch (action.type) {
    case UserActions.GET_USER_LIST:
      return { ...state, loading: true };
    case UserActions.GET_USER_LIST_SUCCESS:
       return { ...state, ...action.payload, loading: false };
    case UserActions.CREAT_USER:
      return { ...state, ...action.payload, loading: true };
    case UserActions.CREAT_USER_SUCCESS:
      return { ...state, loading: false };
    case UserActions.UPDATE_USER:
      return { ...state, ...action.payload, loading: true };
    case UserActions.UPDATE_USER_SUCCESS:
      return { ...state, loading: false };
    case UserActions.DELETE_USER:
      return { ...state, ...action.payload, loading: true };
    case UserActions.DELETE_USER_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
}