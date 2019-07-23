import { Routes, RouterModule } from "@angular/router";
import { LayoutPageComponent } from './pages/layout-page.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'content',
        loadChildren: () => import('../contents/contents.module').then(m => m.ContentsModule) 
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}

