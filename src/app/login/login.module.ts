import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import { Http, HttpModule } from '@angular/http';

export function HttpLoaderFactory(http: Http) {
     return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
                TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
