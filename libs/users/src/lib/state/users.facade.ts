import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  currentUser$ = this.store.select(UsersSelectors.selectUser);
  isAuthenticated$ = this.store.select(UsersSelectors.selectUserIsAuth);

  constructor(private store: Store) {}

  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}
