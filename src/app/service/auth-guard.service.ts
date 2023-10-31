import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {TokenService} from "./token.service";
import {Observable} from "rxjs";

export let AuthGuard: CanActivateFn;
AuthGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {

  return inject(TokenService).getToken()
    ? true
    : inject(Router).createUrlTree(['/login']);

};
