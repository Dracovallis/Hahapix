import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const appKey = "kid_S1c3oKIMG" // APP KEY HERE;
const appSecret = "4ac5ee6ae67d4fb78f8325faac1ea1bf" // APP SECRET HERE;
const usersBaseUrl = `https://baas.kinvey.com/user/${appKey}/`;


@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(username) {
    let query = {
      "username": username
    }
    return this.http.get(
      usersBaseUrl + `?query={"username":"${username}"}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }

    )
  }

  getUsers() {
    return this.http.get(
      usersBaseUrl,
      {
        headers: this.createAuthHeaders('Kinvey')
      }

    )
  }

  deleteUser(id) {
    return this.http.delete(
      usersBaseUrl + id + `?hard=true`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  private createAuthHeaders(type: string): HttpHeaders {
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
