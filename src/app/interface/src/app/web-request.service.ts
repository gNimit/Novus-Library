import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:8000';
  }

  get (uri: string) {
      return this.http.get<any>(`${this.ROOT_URL}/${uri}`);
  }

  post (uri: string, payload: Object) {
      return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

}
