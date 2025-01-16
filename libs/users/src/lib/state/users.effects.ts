import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';

import { JwtService } from '../services/jwt.service';
import { UsersService } from '../services/users.service';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  buildUserSsession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (!this.jwtService.isValidToken()) {
          return of(UsersActions.buildUserSessionFailure());
        }

        const userId = this.jwtService.getUserIdFromToken();
        if (!userId) {
          return of(UsersActions.buildUserSessionFailure());
        }

        return this.usersService.getUser(userId).pipe(
          map((user) => UsersActions.buildUserSessionSuccess({ user })),
          catchError(() => of(UsersActions.buildUserSessionFailure()))
        );
      })
    )
  );
}
