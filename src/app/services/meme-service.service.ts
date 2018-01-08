import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const appKey = "kid_S1c3oKIMG" // APP KEY HERE;
const appSecret = "4ac5ee6ae67d4fb78f8325faac1ea1bf" // APP SECRET HERE;
const memeBaseUrl = `https://baas.kinvey.com/appdata/${appKey}/Meme/`;
const memeQueryUrl = `https://baas.kinvey.com/appdata/${appKey}/Meme`;


@Injectable()
export class MemeServiceService {

  constructor(private http: HttpClient) { }

  create(memeModel: Object): Observable<Object> {
    return this.http.post(
      memeBaseUrl,
      JSON.stringify(memeModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  likeMeme(id, memeModel): Observable<Object> {
    return this.http.put(
      memeBaseUrl + id,
      JSON.stringify(memeModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  dislikeMeme(id, memeModel): Observable<Object> {
    return this.http.put(
      memeBaseUrl + id,
      JSON.stringify(memeModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getMemes(): Observable<Object> {
    return this.http.get(
      memeBaseUrl,
      {
        headers: this.createAuthHeaders('Kinvey')
      }

    )
  }

  getMeme(id): Observable<Object> {
    return this.http.get(
      memeBaseUrl + id,
      {
        headers: this.createAuthHeaders('Kinvey')
      }

    )
  }

  deleteMeme(id): Observable<Object> {
    return this.http.delete(
      memeBaseUrl + id,
      {
        headers: this.createAuthHeaders('Kinvey')
      }

    )
  }

  edit(meme, id): Observable<Object> {
    return this.http.put(
      memeBaseUrl + id,
      JSON.stringify(meme),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getFreshMemes(): Observable<Object> {
    return this.http.get(
      memeBaseUrl + `?query={}&sort={"_kmd.ect": -1}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }

    )
  }

  getHotMemes(): Observable<Object> {
    return this.http.get(
      memeQueryUrl + `?query={}&sort={"rating": -1}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }

    )
  }

  getMemesByCategory(category): Observable<Object> {
    return this.http.get(
      memeQueryUrl + `?query={"category":"${category}"}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }

    )
  }

  getSearchedMemes(): Observable<Object> {
    return this.http.get(
      memeBaseUrl,
      {
        headers: this.createAuthHeaders('Kinvey')
      }

    )
  }

  getMemesByUser(username): Observable<Object> {

    return this.http.get(
      memeQueryUrl + `?query={"author":"${username}"}`,
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
