import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
})

export class HomeComponent {

  // Constructor
  constructor(private titleService: Title) { }

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Home");
  }

}