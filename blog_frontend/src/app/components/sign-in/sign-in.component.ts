import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SignInService } from '../../services/sign-in/sign-in.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
    private signInService: SignInService
  ) 
  {
    this.signInForm = this.fb.group
    ({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Sign In");
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const credentials = {
        username: this.signInForm.value.username,
        password: this.signInForm.value.password
      };

      this.signInService.login(credentials).subscribe({
        next: (response) => {
          this.successMessage = 'Login successful !';
          this.errorMessage = null;
        },
        error: (error) => {
          this.successMessage = null;
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      });
    }
  }

}