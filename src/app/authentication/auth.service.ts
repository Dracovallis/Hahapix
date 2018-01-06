import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Models
import { RegisterModel } from './models/register.model';
import { LoginModel } from './models/login.model';

const appKey = "kid_S1c3oKIMG" // APP KEY HERE;
const appSecret = "4ac5ee6ae67d4fb78f8325faac1ea1bf" // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
const usersBaseUrl = `https://baas.kinvey.com/user/${appKey}/`;


@Injectable()
export class AuthenticationService {
  private currentAuthtoken : string;
  private currentUserId: string;
  constructor(
    private http : HttpClient
  ) { }

  get userId() {
    return this.currentUserId || localStorage.getItem('userId')
  }

  set userId(value: string) {
    this.currentUserId = value;
  }

  login(loginModel : LoginModel) {
    return this.http.post(
      loginUrl,
      JSON.stringify(loginModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  editUser(id, user): Observable<Object> {
    return this.http.put(
      usersBaseUrl + id,
      JSON.stringify(user),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getUser(username) {
    let query = {
      "username":username
    }
    return this.http.get(
      usersBaseUrl + `?query={"username":"${username}"}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }

    )
  }

  register(registerModel : Object) : Observable<Object> {
    return this.http.post(
      registerUrl, 
      JSON.stringify(registerModel),
      { 
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  logout() {
    return this.http.post(
      logoutUrl,
      {},
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  isLoggedIn() {
    let authtoken : string = localStorage.getItem('authtoken');

    return localStorage.getItem('authtoken');
  }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value : string) {
    this.currentAuthtoken = value;
  }

  private createAuthHeaders(type : string) : HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      })
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }
}