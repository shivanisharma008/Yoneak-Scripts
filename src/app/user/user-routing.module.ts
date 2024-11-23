import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo:'',pathMatch:'full'
  },
  {
    path:'blogs',
    loadChildren:()=>
      import('./blogs/blogs.module').then((m)=> m.BlogsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
