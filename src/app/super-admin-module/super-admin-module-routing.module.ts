import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'admin-details',pathMatch:'full'},
  {
    path:'user-details',
    loadChildren:()=>
      import('./user-deatils/user-deatils.module').then((m)=> m.UserDeatilsModule)
  },
  {
    path:'admin-details',
    loadChildren:()=>
      import('./admin-deatils/admin-deatils.module').then((m)=> m.AdminDeatilsModule)
  },
  {
    path:'scripts-details',
    loadChildren:()=>
      import('./scripts-details/scripts-details.module').then((m)=> m.ScriptsDetailsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminModuleRoutingModule { }
