import { Action } from '@ngrx/store';
import { Role } from '../services/model/roles';

export const GET_ROLE_LIST           = 'Role get list';
export const GET_ROLE_LIST_SUCCESS   = 'Role get list success';
export const CREAT_ROLE              = 'Role create';
export const CREAT_ROLE_SUCCESS      = 'Role create success';
export const UPDATE_ROLE             = 'Role update';
export const UPDATE_ROLE_SUCCESS     = 'Role update success';
export const DELETE_ROLE             = 'Role delete';
export const DELETE_ROLE_SUCCESS     = 'Role delete success';


export class GetRoleList implements Action {
  readonly type = GET_ROLE_LIST;
  constructor(public payload?: any) {}
}

export class GetRoleListSuccess implements Action {
  readonly type = GET_ROLE_LIST_SUCCESS;
  constructor(public payload: Role[]) {}
}

export class CreateRole implements Action {
  readonly type = CREAT_ROLE;
  constructor(public payload:Role) {}
}

export class CreateRoleSuccess implements Action {
  readonly type = CREAT_ROLE_SUCCESS;
  constructor(public payload?: any) {}
}


export class UpdateRole implements Action {
  readonly type = UPDATE_ROLE;
  constructor(public payload: Role) {}
}
export class UpdateRoleSuccess implements Action {
  readonly type = UPDATE_ROLE_SUCCESS;
  constructor(public payload?: any) {}
}

export class DeleteRole implements Action {
  readonly type = DELETE_ROLE;
  constructor(public payload:Role) {}
}

export class DeleteRoleSuccess implements Action {
  readonly type = DELETE_ROLE_SUCCESS;
  constructor(public payload?:any) {}
}


export type All
  = GetRoleList
  | GetRoleListSuccess
  | CreateRole
  | CreateRoleSuccess
  | UpdateRole
  | UpdateRoleSuccess
  | DeleteRole
  | DeleteRoleSuccess;
  