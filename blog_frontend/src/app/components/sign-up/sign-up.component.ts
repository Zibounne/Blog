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
    private titleService: Title,
    private fb: FormBuilder,
    private signUpService: SignUpService
  ) 
  {
    this.signUpForm = this.fb.group
    ({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  //Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Sign Up");
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const user = {
        email: this.signUpForm.value.email,
        username: this.signUpForm.value.username,
        password: this.signUpForm.value.password
      };

      this.signUpService.register(user).subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful!';
          this.errorMessage = null;
        },
        error: (error) => {
          this.successMessage = null;
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    }
  }

}