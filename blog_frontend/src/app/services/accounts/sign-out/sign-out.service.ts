import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SignOutService {

  private signOutUrl = 'http://localhost:8000/api/account/signOut/';

  constructor(private http: HttpClient) {}

  signOut(): Observable<any> {
    const token = localStorage.getItem('token'); // Récupère le token d'authentification
    const csrfToken = this.getCsrfToken(); // Récupère le token CSRF

    let headers = new HttpHeaders();
    headers = headers.set('X-CSRFToken', csrfToken || ''); // Ajoute le token CSRF à l'en-tête

    if (token) {
      headers = headers.set('Authorization', `Token ${token}`); // Ajoute le token d'authentification à l'en-tête si disponible
    }

    return this.http.post(this.signOutUrl, {}, { headers, withCredentials: true });
  }

  // Fonction pour récupérer le token CSRF à partir des cookies
  private getCsrfToken(): string | null {
    return document.cookie.split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith('csrftoken='))
      ?.split('=')[1] || null;
  }
  
}