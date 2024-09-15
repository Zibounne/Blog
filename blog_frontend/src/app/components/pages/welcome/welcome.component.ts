import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ]
})

export class WelcomeComponent implements OnInit {

  /////////////////////// Property ////////////////////////

  private sections: HTMLElement[] = [];
  private currentSectionIndex = 0;
  private isScrolling = false;

  ////////////////////// Constructor //////////////////////

  constructor(private titleService: Title) { }

  //////////////////////// Methods ////////////////////////

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Welcome");
  }


}