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
  // {
  //   path:'scripts-details',
  //   loadChildren:()=>
  //     import('./scripts-details/scripts-details.module').then((m)=> m.ScriptsDetailsModule)
  // },
  {
    path:'category',
    loadChildren:()=>
      import('./cateogry/cateogry.module').then((m)=> m.CateogryModule)
  },
  {
    path:'add-category',
    loadChildren:()=>
      import('./add-cateogry/add-cateogry.module').then((m)=> m.AddCateogryModule)
  },
  {
    path:'sub-category',
    loadChildren:()=>
      import('./sub-cateogry/sub-cateogry.module').then((m)=> m.SubCateogryModule)
  },
  {
    path:'add-sub-category',
    loadChildren:()=>
      import('./add-sub-cateogry/add-sub-cateogry.module').then((m)=> m.AddSubCateogryModule)
  },
  {
    path:'user-uploaded-links',
    loadChildren:()=>
      import('./user-upload-links/user-upload-links.module').then((m)=> m.UserUploadLinksModule)
  },
  {
    path:'blogs',
    loadChildren:()=>
      import('./blogs-list/blogs-list.module').then((m)=> m.BlogsListModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminModuleRoutingModule { }
