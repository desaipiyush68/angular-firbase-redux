import * as RoleActions from '../actions/roles.actions';
import { Role } from '../services/model/roles';
export type Action = RoleActions.All;
let role:Role;
const initialState = {
   role : []
}
/// Reducer function
export function roleReducer(state =initialState, action: Action) {
  switch (action.type) {
    case RoleActions.GET_ROLE_LIST:
      return { ...state, loading: true };
    case RoleActions.GET_ROLE_LIST_SUCCESS:
      return { ...state, role:action.payload, loading: false };
    case RoleActions.CREAT_ROLE:
      return { ...state, ...action.payload, loading: true };
    case RoleActions.CREAT_ROLE_SUCCESS:
      return { ...state, loading: false };
    case RoleActions.UPDATE_ROLE:
      return { ...state, ...action.payload, loading: true };
    case RoleActions.UPDATE_ROLE_SUCCESS:
      return { ...state, loading: false };
    case RoleActions.DELETE_ROLE:
      return { ...state, ...action.payload, loading: true };
    case RoleActions.DELETE_ROLE_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
}
