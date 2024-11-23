import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'accounts',pathMatch:'full'},
  {
    path:'accounts',
    loadChildren:()=>
      import('./accounts/accounts.module').then((m)=> m.AccountsModule)
  },
  {
    path:'user',
    loadChildren:()=>
      import('./user/user.module').then((m)=> m.UserModule)
  },
  {
    path:'super-admin',
    loadChildren:()=>
      import('./super-admin/super-admin.module').then((m)=> m.SuperAdminModule)
  },
  {
    path:'admin',
    loadChildren:()=>
      import('./admin/admin.module').then((m)=> m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
