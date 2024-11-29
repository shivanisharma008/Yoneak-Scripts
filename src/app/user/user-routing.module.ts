import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo:'blogs',pathMatch:'full'
  },
  {
    path:'blogs',
    loadChildren:()=>
      import('./blogs/blogs.module').then((m)=> m.BlogsModule)
  },
  {
    path:'others-video',
    loadChildren:()=>
      import('./see-others-video/see-others-video.module').then((m)=> m.SeeOthersVideoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
