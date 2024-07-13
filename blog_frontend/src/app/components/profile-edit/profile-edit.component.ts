import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { ProfileService } from '../../services/accounts/profile/profile.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './profile-edit.component.html',
})

export class ProfileEditComponent implements OnInit {

  // Variables
  profileForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // Constructor
  constructor
  (
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  )
  {
    this.profileForm = this.fb.group
    ({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern('^[a-zA-Z]+$')]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern('^[a-zA-Z]+$')]],
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]]
    });
  }

  // Init
  ngOnInit(): void {
    this.loadProfile();
  }

  // Method | load profile user
  loadProfile(): void {
    this.profileService.getProfile().subscribe(
      data => {
        this.profileForm.patchValue(data);
      },
      error => {
        this.errorMessage = 'There was an error loading the profile.';
      }
    );
  }

  //  Method | submit update profile
  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    this.profileService.updateProfile(this.profileForm.value).subscribe(
      response => {
        this.successMessage = 'Profile updated successfully !';
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
      },
      error => {
        this.successMessage = null;
        this.errorMessage = 'There was an error updating the profile. Please try again.';
      }
    );
  }

}