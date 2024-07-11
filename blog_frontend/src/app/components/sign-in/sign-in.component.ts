import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { SignInService } from '../../services/sign-in/sign-in.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './sign-in.component.html',
})

export class SignInComponent implements OnInit {

  // Variables
  signInForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // Constructor
  constructor
  (
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private signInService: SignInService
  ) 
  {
    this.signInForm = this.fb.group
    ({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Sign In");
  }

  // Method | Sign In
  signIn() {
    if (this.signInForm.invalid) {
      this.errorMessage = "Please fill out the form correctly.";
      return;
    }

    const { username, password } = this.signInForm.value;

    this.signInService.signIn({ username, password }).subscribe(
      response => {
        this.successMessage = 'Sign In successful !';
        this.errorMessage = null;
        localStorage.setItem('token', response.token);
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);      },
      error => {
        this.successMessage = null;
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }

}