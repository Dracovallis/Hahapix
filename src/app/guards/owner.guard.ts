import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication/auth.service';
import { MemeServiceService } from '../services/meme-service.service';
import { Location } from '@angular/common'

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private ms: MemeServiceService,
    private _location: Location
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let memeId = route.paramMap.get('id');

    return this.checkIfOwner(memeId);
  }

  checkIfOwner(memeId): Promise<boolean> {
    if (this.authService.currentUser) {
      return Promise.resolve(
        this.ms.getMeme(memeId).toPromise().then(
          data => {
            if (this.authService.currentUser['isAdmin']) {
              return true;
            }

            if (this.authService.currentUser['username'] == data['author']) {
              return true;
            } else {
              this._location.back();
              return false;
            }
          }
        ).catch(e => {
          this._location.back();
          return false;

        }))
    }


    if (!this.authService.currentUser) {
      return Promise.resolve(this.authService.getUser(localStorage.getItem('username')).toPromise().then(
        data => {
          this.authService.currentUser = data[0];
          return Promise.resolve(
            this.ms.getMeme(memeId).toPromise().then(
              data => {
                if (this.authService.currentUser['isAdmin']) {

                  return true;
                } else

                  if (this.authService.currentUser['username'] == data['author']) {
                    return true;
                  } else {
                    this._location.back();
                    return false;
                  }
              }
            ).catch(e => {
              this._location.back();
              return false;

            }));

        }
      ).catch(
        e => {
          this._location.back();
          return false;
        }
        ))
    }
  }
}
