import { Component } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { AuthenticationService } from '../auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  public model : LoginModel;
  public loginFail : boolean;
  public username : string;

  constructor(
    private authService : AuthenticationService,
    private router : Router,
    private ss: StorageService
  ) {
    this.model = new LoginModel("", "");
    this.username = "";
  
  }

  login () : void {
    this.authService.login(this.model)
      .subscribe(
        data => {
          this.successfulLogin(data);
        },
        err => {
          this.loginFail = true;
        }
      )
  }

  get diagnostics() : string {
    return JSON.stringify(this.model);
  }

  successfulLogin(data) : void {
    this.authService.authtoken = data['_kmd']['authtoken'];
    this.authService.userId = data['_id']
    localStorage.setItem('userId',data['_id'])
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    this.loginFail = false;
    this.ss.renameUser(data['username']);
    this.router.navigate(['/home']);
  }
}
