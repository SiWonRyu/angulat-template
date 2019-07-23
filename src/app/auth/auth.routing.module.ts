import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from './pages/login-page.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'login', 
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
