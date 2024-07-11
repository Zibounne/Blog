import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SessionServiceService {

  constructor() { }

  isConnected(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isDisconnected(): void {
    localStorage.removeItem('token');
  }
  
}