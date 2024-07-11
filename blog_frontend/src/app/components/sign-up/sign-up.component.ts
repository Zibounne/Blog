import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SignUpService } from '../../services/sign-up/sign-up.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './sign-up.component.html',
})

export class SignUpComponent {

  // Variables
  signUpForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Constructor
  constructor
  (
    private fb: FormBuilder,
    private signUpService: SignUpService
  ) 
  {
    this.signUpForm = this.fb.group
    ({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  // Method | Sign Up
  signUp() {

    if (this.signUpForm.invalid) {
      this.errorMessage = "Please fill out the form correctly.";
      return;
    }

    if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    const { username, email, password, confirmPassword } = this.signUpForm.value;

    this.signUpService.signUp({ username, email, password, confirm_password: confirmPassword }).subscribe(
      response => {
        this.successMessage = 'User registered successfully';
        this.errorMessage = null;
        this.signUpForm.reset();
      },
      error => {
        this.errorMessage = 'There was an error ! ' + error.error.message;
        this.successMessage = null;
      }
    );
  }

}