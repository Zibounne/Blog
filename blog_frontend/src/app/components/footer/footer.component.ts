import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})

export class FooterComponent implements OnInit {

  private header: HTMLElement | null = null;
  currentYear: number = 0;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.updateYear();
    this.header = this.document.getElementById("footer");
  }
  
  updateYear() {
    this.currentYear = new Date().getFullYear();
  }

}