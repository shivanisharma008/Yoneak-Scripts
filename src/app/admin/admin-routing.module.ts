import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'add-scripts',pathMatch:'full'},
 {
  path:'my-scripts',
  loadChildren:()=>
    import('./my-scripts/my-scripts.module').then((m)=> m.MyScriptsModule)
 },
 {
  path:'add-scripts',
  loadChildren:()=>
    import('./add-scripts/add-scripts.module').then((m)=> m.AddScriptsModule)
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }