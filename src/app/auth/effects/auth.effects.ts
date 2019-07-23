import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, map, tap, exhaustMap } from 'rxjs/operators';
import { 
  LoginPageActions,
  AuthActions,
  AuthApiActions
} from '../actions';
import { Credentials } from '../models';
import { of } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  // Login Effect
  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      map(action => action.credentials),
      exhaustMap((auth: Credentials) => 
        this.authService.login(auth).pipe(
          map(user => AuthApiActions.loginSuccess({ user })),
          catchError(error => of(AuthApiActions.loginFailure({ error }))
          )
        )
      )
    )
  );
  
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(() => window.sessionStorage.setItem('template-authed', 'ok'))
      ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginRedirect, AuthActions.logout),
        tap(_ => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );


  logoutConfirmation$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.logoutConfirmation),
      exhaustMap(() => confirm('로그아웃 하시겠습니까?') ? of(true) : of(false)),
      map(result => {
        if (result) {
          window.sessionStorage.removeItem('template-authed');
          return AuthActions.logout();
        } else {
          return AuthActions.logoutConfirmationDismiss();
        }
      })
    )
  );
}