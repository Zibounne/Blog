import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { Article } from '../../../models/articles/article';

import { SessionService } from '../../accounts/session/session.service';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  /* ===================== Variables ===================== */

  private apiUrl = 'http://localhost:8000/api/articles/';

  /* ==================== Constructor ==================== */
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  /* ====================== Methods ====================== */

  private getHeaders(): HttpHeaders {
    const token = this.sessionService.getToken();
    return token ? new HttpHeaders().set('Authorization', `Token ${token}`) : new HttpHeaders();
  }

  getArticles(): Observable<Article[]> {
    const headers = this.getHeaders();
    return this.http.get<Article[]>(this.apiUrl, { headers });
  }  

  getArticle(id: number): Observable<Article> {
    const headers = this.getHeaders();
    return this.http.get<Article>(`${this.apiUrl}${id}/`, { headers });
  }

  createArticle(article: Article): Observable<Article> {
    const headers = this.getHeaders();
    return this.http.post<Article>(this.apiUrl, article, { headers });
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    const headers = this.getHeaders();
    return this.http.put<Article>(`${this.apiUrl}${id}/`, article, { headers });
  }

  deleteArticle(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers });
  }

}