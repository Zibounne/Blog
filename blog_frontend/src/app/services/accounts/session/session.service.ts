import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

  constructor() { }

  isConnected(): boolean {
    return typeof localStorage !== 'undefined' && localStorage.getItem('token') !== null;
  }

  isDisconnect(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

}