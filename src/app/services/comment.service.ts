import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const appKey = "kid_S1c3oKIMG" // APP KEY HERE;
const appSecret = "4ac5ee6ae67d4fb78f8325faac1ea1bf" // APP SECRET HERE;
const postCommentUrl = `https://baas.kinvey.com/appdata/${appKey}/Comments`;
const getCommentsUrl = `https://baas.kinvey.com/appdata/${appKey}/Comments/?query=`;

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(id): Observable<Object> {
    let query = { "memeId": id };
    let sort = {"_kmd.ect": -1};
    
    return this.http.get(
      getCommentsUrl + JSON.stringify(query)+ "&sort=" + JSON.stringify(sort) ,
      {
        headers: this.createAuthHeaders('Kinvey')
      }

    )
  }

  create(memeModel: Object): Observable<Object> {
    return this.http.post(
      postCommentUrl,
      JSON.stringify(memeModel),
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
