import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
} from "@angular/router";
import { take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromRoot from "../app.reducer";
import { Observable } from "rxjs";

@Injectable() // So that you can import AuthService (for sure) and Router (I think)
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromRoot.State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

  canLoad(route: Route): Observable<boolean> {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}
