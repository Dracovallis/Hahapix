import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication/auth.service';
import { Location } from '@angular/common'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private _location: Location
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {



    return this.checkIfAdmin();
  }

  checkIfAdmin(): Promise<boolean> | boolean {
    if (!localStorage.getItem('authToken')) {
      return false;
    } else

      if (!this.authService.currentUser) {
        return Promise.resolve(this.authService.getUser(localStorage.getItem('username')).toPromise().then(
          data => {
            this.authService.currentUser = data[0];
            if (this.authService.currentUser['isAdmin']) {
              return true
            }
            this._location.back();
            return this.authService.currentUser['isAdmin'];
          }
        ).catch(e => {
          this._location.back();
          return false;
        }));
      } else {
        if (this.authService.currentUser['isAdmin']) {
          return true
        }
        this._location.back();
        return this.authService.currentUser['isAdmin'];
      }
  }
}
