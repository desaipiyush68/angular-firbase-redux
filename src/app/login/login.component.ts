import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(
        public router: Router,
        private fb: FormBuilder,
        private authService: AuthService) {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

    }

    ngOnInit() {
    }


    login() {

        const formValue = this.form.value;
        this.authService.login(formValue.email, formValue.password)
            .subscribe(
            () => this.router.navigate(['/users'])
            );
    }



}
