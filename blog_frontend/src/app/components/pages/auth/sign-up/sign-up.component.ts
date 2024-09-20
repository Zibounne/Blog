import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
})

export class SignUpComponent {

  /////////////////////// Property ////////////////////////

  successMessage: string | null = null;
  errorMessage: string | null = null;

  ////////////////////// Constructor //////////////////////
  
  constructor
  (
    private titleService: Title,
  ) {}

  //////////////////////// Methods ////////////////////////

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Sign Up");
  }

  // Method | Sign Up

}