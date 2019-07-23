import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Credentials } from '../models';
import { LoginPageActions } from '../actions';
import * as fromAuth from '../reducers';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));
  isLoggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

  onSubmit(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }

  constructor(private store: Store<fromAuth.State>, private router: Router) {}

  ngOnInit() {
    this.store.pipe(
      select(fromAuth.getLoggedIn),
      filter(authed => authed),
      take(1)
    ).subscribe(() => this.router.navigate(['/']));
  }
}