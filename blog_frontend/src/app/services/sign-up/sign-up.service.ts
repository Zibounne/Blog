import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SignUpService {

  private apiUrl = 'http://localhost:8000/api/accounts';

  constructor(private http: HttpClient) { }

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signUp/`, user);
  }

}