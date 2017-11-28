import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private sessionService: SessionService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('activate auth')
    if (!this.sessionService.isAuth()) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
  canActivateChild() {
    console.log('activate childe auth')
    if (!this.sessionService.isAuth()) {
      this._router.navigate(['/register']);
      return false;
    }

    return true;
  }
}
