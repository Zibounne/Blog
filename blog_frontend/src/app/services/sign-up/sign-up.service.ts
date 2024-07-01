import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SignUpService {

  private baseUrl = 'http://localhost:8000/api/signUp/';

  constructor(private http: HttpClient) { }

  signUp(userData: any): Observable<any> {
    return this.http.post(this.baseUrl, userData);
  }

}