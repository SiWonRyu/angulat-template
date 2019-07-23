import { User } from '../models';
import { createReducer, on } from '@ngrx/store';
import { AuthApiActions, AuthActions } from '../actions';


export interface State {
  user: User | null;
}

export const inititalState: State = {
  user: null
};

export const reducer = createReducer(
  inititalState,
  on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.logout, () => inititalState),
  on(AuthActions.LoadUserInfo, (state) => ({ user: { name: 'User' }}))
);

export const getUser = (state: State) => state.user;