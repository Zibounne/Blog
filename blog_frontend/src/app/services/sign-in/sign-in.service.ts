import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SignInService {

  private apiUrl = 'http://localhost:8000/api/accounts';

  constructor(private http: HttpClient) { }

  signIn(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signIn/`, credentials);
  }

}