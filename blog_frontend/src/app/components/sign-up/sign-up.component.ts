import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SignUpService } from '../../services/sign-up/sign-up.service';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
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

export class SignUpComponent implements OnInit {

  //Variables
  signUpForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  //Constructor
  constructor
  (
    private titleService: Title,
    private fb: FormBuilder,
    private signUpService: SignUpService,
    private router: Router
  ) 
  {
    this.signUpForm = this.fb.group
    ({
      email: ['', [Validators.required, Validators.email]],
      pseudo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  //Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Sign Up");
  }

  //Submit
  onSubmit(): void {
    if (this.signUpForm.valid) {
      const formValues = this.signUpForm.value;
      const userData = {
        username: formValues.pseudo,
        email: formValues.email,
        password: formValues.password
      };

      this.signUpService.signUp(userData)
        .pipe(
          tap(response => {
            this.successMessage = 'User signed up successfully!';
            setTimeout(() => {
              this.router.navigate(['/sign-in']);
            }, 2000);
          }),
          catchError(error => {
            this.errorMessage = 'Error!';
            return error; // Assure-toi de retourner l'erreur pour que le catchError fonctionne correctement
          })
        )
        .subscribe();
    }
  }

}