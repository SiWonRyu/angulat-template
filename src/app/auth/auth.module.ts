import { NgModule } from "@angular/core";
import { LoginPageComponent } from './pages/login-page.component';
import { LoginFormComponent } from './components/login-form.component';
import { AuthRoutingModule } from './auth.routing.module';
import { reducers } from '../auth/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: COMPONENTS,
})
export class AuthModule {}
