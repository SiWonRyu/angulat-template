import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/auth/models';
import { AuthActions } from '../../auth/actions';

import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import { SideNav, SideNavMenu } from '../models';


@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutPageComponent {
  loggedIn$: Observable<boolean>;
  user$: Observable<User>;

  sideNavMenu: SideNav[] = SideNavMenu;

  constructor(private store: Store<fromRoot.State & fromAuth.State>) {
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.user$ = this.store.pipe(select(fromAuth.getUser));
  }

  logout() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }
}