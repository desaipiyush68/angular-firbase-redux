import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { PageHeaderModule } from './../../shared';
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule       
    ],
    declarations: [UsersComponent]
})
export class UsersModule { }
