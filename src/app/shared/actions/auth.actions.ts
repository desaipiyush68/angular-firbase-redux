import { Action } from '@ngrx/store';


export const LOGIN_REQUESTED = 'Login Requested';
export const LOGIN_SUCCESS = 'Login Success';
export const LOGOUT_REQUESTED = 'Logout Requested';
export const LOGOUT_SUCCESS = 'Logout Success';
export const SIGNUP_REQUESTED = 'Signup Requested';
export const SIGNUP_SUCCESS = 'Signup Success';
export const AUTH_ERROR = 'Auth Error';

export interface Cradantial {
    email: string,
    password: string
}



export class Login implements Action {
    readonly type = LOGIN_REQUESTED;
    constructor(public payload: Cradantial) { }
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class Logout implements Action {
    readonly type = LOGOUT_REQUESTED;
    constructor() { }
}

export class LogoutSuccess implements Action {
    readonly type = LOGOUT_SUCCESS;
    constructor(public payload = null) { }
}


export class Signup implements Action {
    readonly type = SIGNUP_REQUESTED;
    constructor(public payload: Cradantial) { }
}
export class SignupSuccess implements Action {
    readonly type = SIGNUP_SUCCESS;
    constructor(public payload: any) { }
}

export class AuthError implements Action {
    readonly type = AUTH_ERROR;
    constructor(public payload?: any) { }
}



export type All
    = Login
    | LoginSuccess
    | Signup
    | SignupSuccess
    | Logout
    | LogoutSuccess
    | AuthError;

