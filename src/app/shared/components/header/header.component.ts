import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

//ngrx
import * as authActions from '../../actions/auth.actions';

//store 
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    pushRightClass: string = 'push-right';

    constructor(
        private translate: TranslateService,
        public router: Router, 
        private store: Store<AppState>) {
        this.store.select('auth'); 
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() { }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    // rltAndLtr() {
    //     const dom: any = document.querySelector('body');
    //     dom.classList.toggle('rtl');
    // }

    onLoggedout() {
       this.store.dispatch(new authActions.Logout());
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
