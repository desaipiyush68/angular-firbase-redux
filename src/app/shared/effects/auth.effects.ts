import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AuthService } from '../services/auth.service';
import { AuthInfo } from '../services/auth-Info';
import * as authActions from '../actions/auth.actions';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

export type Action = authActions.All;

@Injectable()
export class AuthEffects {
    constructor(private actions: Actions,
        private authService: AuthService,
        public router: Router) { }

    @Effect()
    login: Observable<Action> = this.actions
        .ofType(authActions.LOGIN_REQUESTED)
        .map((action: authActions.Login) => action.payload)
        .switchMap(payload => this.authService.login(payload.email, payload.password)
            .map(res => (new authActions.LoginSuccess(res)))
            .do(() => this.router.navigate(['/users']))
            .catch((error) => Observable.of(new authActions.AuthError({ error: error })))
        );

    @Effect()
    signup: Observable<Action> = this.actions
        .ofType(authActions.SIGNUP_REQUESTED)
        .map((action: authActions.Signup) => action.payload)
        .switchMap(payload => this.authService.signUp(payload.email, payload.password)
            .map(res => (new authActions.SignupSuccess(res)))
            .do(() => this.router.navigate(['/users']))
            .catch((error) => Observable.of(new authActions.AuthError({ error: error })))
        );

    @Effect()
    logout: Observable<Action> = this.actions
        .ofType(authActions.LOGOUT_REQUESTED)
        .map((action: authActions.Logout) => action)
        .switchMap(() => this.authService.logout()
            .map(() => new authActions.LogoutSuccess())
            .do(() => this.router.navigate(['/login']))
            .catch((error) => Observable.of(new authActions.AuthError({ error: error })))
        );



}
