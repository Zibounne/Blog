import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignOutService } from '../../services/accounts/sign-out/sign-out.service';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [],
  templateUrl: './sign-out.component.html',
})

export class SignOutComponent implements OnInit {

  // Constructor
  constructor
  (
    private signOutService: SignOutService,
    private router: Router
  )
  {

  }

  // Init
  ngOnInit(): void {
    this.signOutService.signOut().subscribe(
      response => {
        localStorage.removeItem('token');
        this.router.navigate(['/sign-in']);
      },
      error => {
        console.error('Sign out failed.', error);
        this.router.navigate(['/sign-in']);
      }
    );
  }

}