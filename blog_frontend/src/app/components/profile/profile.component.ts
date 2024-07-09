import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
})

export class ProfileComponent {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Blog | Profile");
  }

}