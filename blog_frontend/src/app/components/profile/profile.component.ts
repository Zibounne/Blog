import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { ProfileService } from '../../services/accounts/profile/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {

  // Variables
  profile: any
  role: string = '';

  // Constructor
  constructor
  (
    private titleService: Title,
    private profileService: ProfileService
  )
  {

  }

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Profile");
    this.loadProfile();
  }

  // Method | load profile user
  loadProfile(): void {
    this.profileService.getProfile().subscribe(
      data => {
        this.profile = data;
        this.userRole();
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  // Method | user role
  userRole(): void {
    if (this.profile.is_superuser) {
      this.role = 'Admin';
    } else if (this.profile.is_staff) {
      this.role = 'Staff';
    } else {
      this.role = 'User';
    }
  }

  // Method | user role color
  getUserRoleClass(): string {
    switch (this.role) {
      case 'User':
        return 'text-green';
      case 'Staff':
        return 'text-blue';
      case 'Admin':
        return 'text-red';
      default:
        return '';
    }
  }

}