import { Injectable } from '@angular/core';
import { SessionService } from '../../session/session.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserGuardService implements CanActivate {

  // Constructor
  constructor
  (
    private sessionService: SessionService,
    private router: Router
  )
  {

  }

  // Method | canActivate | if isDisconnected go to signIn else don't restrict
  canActivate(): boolean {
    if (this.sessionService.isConnected()) {
      return true;
    }
    this.router.navigate(['/sign-in']);
    return false;
  }

}