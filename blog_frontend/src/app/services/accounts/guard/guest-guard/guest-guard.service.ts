import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../../session/session.service';

@Injectable({
  providedIn: 'root'
})

export class GuestGuardService implements CanActivate {

  // Constructor
  constructor
  (
    private sessionService: SessionService,
    private router: Router
  )
  {

  }

  // Method | canActivate | go to 'Profile' if isConnected else don't restrict
  canActivate(): boolean {
    if (this.sessionService.isConnected()) {
      this.router.navigate(['/profile']);
      return false;
    }
    return true;
  }

}