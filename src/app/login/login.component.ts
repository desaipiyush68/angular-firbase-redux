import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Observable } from 'rxjs/Observable';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

//ngrx
import * as authActions from '../shared/actions/auth.actions';

//store 
import { Store } from '@ngrx/store';
import { AppState } from '../shared/store/store';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent {

    form: FormGroup;
    constructor(
        public router: Router,
        private fb: FormBuilder,
        private store: Store<AppState>) {
        this.store.select('auth');
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        const formValue = this.form.value;
        this.store.dispatch(new authActions.Login(formValue))
    }

}
