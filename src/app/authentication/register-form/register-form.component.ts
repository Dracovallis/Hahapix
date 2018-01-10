import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthenticationService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent  {
  public model : RegisterModel;
  public registeredUser : string;
  public registerSuccess : boolean;
  public registerFail : boolean;

  constructor(
    private authService : AuthenticationService, 
    private router : Router,
    private _service: NotificationsService
  ) { 
    this.model = new RegisterModel("", "", "", "");  
  }

  register() : void {
    let registerSubmitModel = {
      username: this.model.username,
      email: this.model.email,
      password: this.model.password
    }

    this.authService.register(registerSubmitModel)
      .subscribe(
        data => {
          this.successfulRegister(data);
        },
        err => {
          this._service.error('Error', 'Failed to register')
          this.registerFail = true;
        }
      )
  }

  get diagnostics() : string {
    return JSON.stringify(this.model);
  }

  successfulRegister(data) : void {
    this._service.success('Success', 'You have registered as ' + data['username'])
    this.registerSuccess = true;
    this.registeredUser = data['username'];

    this.router.navigate(['/login'])
  }
}
