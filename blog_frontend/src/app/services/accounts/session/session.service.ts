import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

  constructor() { }

  isConnected(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token') !== null;
    }
    return false;
  }

  isDisconnect(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

}