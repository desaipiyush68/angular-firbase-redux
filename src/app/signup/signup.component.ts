import { Component } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder,
        private authService: AuthService,
        private router: Router) {

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

        this.authService.signUp(val.email, val.password)
            .subscribe(
            () => {
                this.router.navigateByUrl('/users');
            },
            err => alert(err)
            );
    }

}
