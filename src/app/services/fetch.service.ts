import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  constructor(private http: HttpClient) { }
  
  public request(path: string, video: boolean = false): Observable<any> {
    if (!('fetch' in window)) {
      throw new Error('Fetch not supported with this browser');
    }

    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(`https://content.kpnc.io/img/trip/${path}.json`, options);
  }
}
