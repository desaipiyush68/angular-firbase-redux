import { Component } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
//ngrx
import * as authActions from '../shared/actions/auth.actions';

//store 
import { Store }        from '@ngrx/store';
import { AppState } from '../shared/store/store';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent {
    form: FormGroup;
    constructor(private fb: FormBuilder,
        private router: Router,
        private store: Store<AppState>) {
       this.store.select('auth');
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirm: ['', Validators.required]
        });
    }

    isPasswordMatch() {
        const val = this.form.value;
        return val && val.password && val.password == val.confirm;
    }

    signUp() { 
        const val = this.form.value;
        this.store.dispatch(new authActions.Signup(val));
    }

}

