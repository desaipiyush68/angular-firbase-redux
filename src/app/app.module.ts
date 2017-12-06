import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { AuthService } from './shared/services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination'; 
//@Ngrx
import { EffectsModule }             from '@ngrx/effects';
import { StoreModule }               from '@ngrx/store';
import { StoreDevtoolsModule }       from '@ngrx/store-devtools';

//reduces and Effects
import { UserEffects }  from './shared/effects/users.effects';
import { RoleEffects }  from './shared/effects/roles.effects';
import { AuthEffects }  from './shared/effects/auth.effects';
import { userReducer }  from './shared/reducers/users.reducers';
import { roleReducer }  from './shared/reducers/roles.reducers';
import { authReducer }  from './shared/reducers/auth.reducers';


export function HttpLoaderFactory(http: Http) {
     return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const firebaseConfig = {
    apiKey: "AIzaSyAOxA5AVFhjcr3Mw9y7ImH9P3VutzQOYOA",
    authDomain: "piyush-eqs.firebaseapp.com",
    databaseURL: "https://piyush-eqs.firebaseio.com",
    projectId: "piyush-eqs",
    storageBucket: "piyush-eqs.appspot.com",
    messagingSenderId: "533321736928"
  };

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        NgxPaginationModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        
        StoreModule.forRoot({
          user: userReducer,
          role: roleReducer,
          auth:  authReducer
        }),
         StoreDevtoolsModule.instrument({
            maxAge: 10 
          }),
        EffectsModule.forRoot([UserEffects,RoleEffects,AuthEffects])
        
    ],
    providers: [AuthService,AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}

