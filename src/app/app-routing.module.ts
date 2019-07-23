import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './core/components';
import { AuthGuard } from './auth/services/auth-guard.service';

export const routes: Routes = [
  { path: '',
    redirectTo: '/main/content/collection',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard]
  },
  { 
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
