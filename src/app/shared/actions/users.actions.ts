import { Action } from '@ngrx/store';
import { User } from '../services/model/users';

export const GET_USER_LIST           = 'User get list';
export const GET_USER_LIST_SUCCESS   = 'User get list success';
export const CREAT_USER              = 'User create';
export const CREAT_USER_SUCCESS      = 'User create success';
export const UPDATE_USER             = 'User update';
export const UPDATE_USER_SUCCESS     = 'User update success';
export const DELETE_USER             = 'User delete';
export const DELETE_USER_SUCCESS     = 'User delete success';


export class GetUserList implements Action {
  readonly type = GET_USER_LIST;
  constructor(public payload?: any) {}
}

export class GetUserSuccess implements Action {
  readonly type = GET_USER_LIST_SUCCESS;
  constructor(public payload: User[]) {}
}

export class CreateUser implements Action {
  readonly type = CREAT_USER;
  constructor(public payload:User) {}
}

export class CreateUserSuccess implements Action {
  readonly type = CREAT_USER_SUCCESS;
  constructor(public payload?: any) {}
}


export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload:User) {}
}
export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;
  constructor(public payload?: any) {}
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER;
  constructor(public payload:User) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = DELETE_USER_SUCCESS;
  constructor(public payload?:any) {}
}


export type All
  = GetUserList
  | GetUserSuccess
  | CreateUser
  | CreateUserSuccess
  | UpdateUser
  | UpdateUserSuccess
  | DeleteUser
  | DeleteUserSuccess;
  