import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common'
import { AuthenticationService } from '../authentication/auth.service';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
    private _location: Location) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let username = route.paramMap.get('username');


    return this.checkUserName(username);
  }

  checkUserName(username) {

    if (!this.authService.currentUser) {
      return Promise.resolve(
        this.authService.getUser(localStorage.getItem('username')).toPromise().then(
          data => {     
            this.authService.currentUser = data[0];

            if (this.authService.currentUser['isAdmin']) {
              return true;
            };

            if (username == this.authService.currentUser['username']) {
              return true;
            } else {
              this._location.back();
              return false;
            }
          }
        ).catch())
    } else {
      if (this.authService.currentUser['isAdmin']) {
        return true;
      };

      if (username == this.authService.currentUser['username']) {
        return true;
      } else {
        this._location.back();
        return false;
      }
    }
  }
}
