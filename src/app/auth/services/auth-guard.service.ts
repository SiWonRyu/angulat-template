import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../reducers';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthApiActions, AuthActions } from '../actions';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  /**
   * ! token 의 유무로 유저 정보를 불러온다. (이 예제에서는 Session Storage 에 저장)
   */
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      tap(() => {
        if (!!window.sessionStorage.getItem('template-authed')) {
          this.store.dispatch(AuthActions.LoadUserInfo());
        }
      }),
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(AuthApiActions.loginRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }

}