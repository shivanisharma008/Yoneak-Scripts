import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminModuleRoutingModule } from './super-admin-module-routing.module';
import { SuperAdminModuleComponent } from './super-admin-module.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MainModule } from "../main/main.module";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SuperAdminModuleComponent
  ],
  imports: [
    CommonModule,
    SuperAdminModuleRoutingModule,
    MatSidenavModule,
    MatIconModule,
       MainModule
]
})
export class SuperAdminModuleModule { }
