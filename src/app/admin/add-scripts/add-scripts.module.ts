import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddScriptsComponent } from './add-scripts.component';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { AngularEditorModule } from '@kolkov/angular-editor';




@NgModule({
  declarations: [
    AddScriptsComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild([{path:'',component:AddScriptsComponent}]),
    MatCardModule,
    AngularEditorModule
    
  ]
})
export class AddScriptsModule { }
