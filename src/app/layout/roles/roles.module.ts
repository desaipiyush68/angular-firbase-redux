import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPageRoutingModule } from './roles-routing.module';
import { RolesPageComponent } from './roles.component';
import { PageHeaderModule } from './../../shared';
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    RolesPageRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [RolesPageComponent]
})
export class RolesModule { }
