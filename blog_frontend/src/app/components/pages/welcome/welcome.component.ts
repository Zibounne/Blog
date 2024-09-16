import { Component, OnInit, HostListener, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

export class WelcomeComponent implements OnInit, AfterViewInit, OnDestroy {

  /////////////////////// Property ////////////////////////

  private sections: HTMLElement[] = [];
  private currentSectionIndex: number = 0;
  private isScrolling: boolean = false;
  private scrollTimeout: any;

  ////////////////////// Constructor //////////////////////

  constructor(
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  //////////////////////// Methods ////////////////////////

  /* =========== Cycles =========== */

  // Init
  ngOnInit(): void {
    this.titleService.setTitle("Blog | Welcome");
    
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('no-scroll');
    }
  }

  // After Init | Capture all sections
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.sections = Array.from(document.querySelectorAll('section'));
      this.scrollToSection(0);
    }
  }

  // Destroy | Reactivates scrolling when leaving this page
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('no-scroll');
    }
  }

  /* =========== Listener =========== */

  // HostListener | Method to handle scrolling
  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (!isPlatformBrowser(this.platformId) || this.isScrolling) return;

    if (event.deltaY > 0) {
      this.nextSection();
    } else {
      this.previousSection();
    }
  }

  // Go to next section
  private nextSection(): void {
    if (this.currentSectionIndex < this.sections.length - 1) {
      this.scrollToSection(this.currentSectionIndex + 1);
    }
  }

  // Go to previous section
  private previousSection(): void {
    if (this.currentSectionIndex > 0) {
      this.scrollToSection(this.currentSectionIndex - 1);
    }
  }

  // Scroll to the section based on the index
  private scrollToSection(index: number): void {
    if (this.isScrolling) return;

    this.isScrolling = true;
    this.currentSectionIndex = index;
    const section = this.sections[this.currentSectionIndex];
    
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 500);
  }
}