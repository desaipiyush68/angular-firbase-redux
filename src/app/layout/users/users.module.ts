import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { PageHeaderModule } from './../../shared';
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule
    ],
    declarations: [UsersComponent]
})
export class UsersModule { }
