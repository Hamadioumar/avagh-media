import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
  template: `
    <header 
      [class.scrolled]="isScrolled" 
      [class.menu-open]="menuOpen"
      class="header"
      role="banner"
      [attr.aria-label]="translate('header.label')"
    >
      <nav class="nav container" role="navigation" [attr.aria-label]="translate('nav.main')">
        <div class="nav-brand">
          <h1 class="brand-text" 
              (click)="scrollToTop()" 
              (keydown.enter)="scrollToTop()"
              (keydown.space)="scrollToTop()"
              tabindex="0"
              role="button"
              [attr.aria-label]="translate('brand.home')">
            <span class="brand-main">AVAGH</span>
            <span class="brand-accent">MEDIA</span>
          </h1>
        </div>
        
        <!-- Desktop Menu -->
        <ul class="nav-menu desktop-menu" role="menubar">
          <li role="none">
            <a href="#about" 
               class="nav-link" 
               role="menuitem"
               [attr.aria-label]="translate('nav.about')">
              <span class="link-text">{{ translate('nav.about') }}</span>
              <span class="link-indicator" aria-hidden="true"></span>
            </a>
          </li>
          <li role="none">
            <a href="#services" 
               class="nav-link" 
               role="menuitem"
               [attr.aria-label]="translate('nav.services')">
              <span class="link-text">{{ translate('nav.services') }}</span>
              <span class="link-indicator" aria-hidden="true"></span>
            </a>
          </li>
          <li role="none">
            <a href="#news" 
               class="nav-link" 
               role="menuitem"
               [attr.aria-label]="translate('nav.news')">
              <span class="link-text">{{ translate('nav.news') }}</span>
              <span class="link-indicator" aria-hidden="true"></span>
            </a>
          </li>
          <li role="none">
            <a href="#partners" 
               class="nav-link" 
               role="menuitem"
               [attr.aria-label]="translate('nav.partners')">
              <span class="link-text">{{ translate('nav.partners') }}</span>
              <span class="link-indicator" aria-hidden="true"></span>
            </a>
          </li>
          <li role="none">
            <a href="#voices" 
               class="nav-link" 
               role="menuitem"
               [attr.aria-label]="translate('nav.voices')">
              <span class="link-text">{{ translate('nav.voices') }}</span>
              <span class="link-indicator" aria-hidden="true"></span>
            </a>
          </li>
          <li role="none">
            <a href="#team" 
               class="nav-link" 
               role="menuitem"
               [attr.aria-label]="translate('nav.team')">
              <span class="link-text">{{ translate('nav.team') }}</span>
              <span class="link-indicator" aria-hidden="true"></span>
            </a>
          </li>
          <li role="none" class="cta-item">
            <a href="#contact" 
               class="nav-link cta" 
               role="menuitem"
               [attr.aria-label]="translate('nav.contact')">
              <span class="link-text">{{ translate('nav.contact') }}</span>
              <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </li>
        </ul>
        
        <div class="nav-actions">
          <!-- Language Switcher -->
          <div class="language-switcher" 
               role="radiogroup" 
               [attr.aria-label]="translate('lang.switcher')">
            <button 
              *ngFor="let lang of languages; trackBy: trackByLang" 
              class="lang-btn"
              [class.active]="currentLanguage === lang.code"
              (click)="switchLanguage(lang.code)"
              role="radio"
              [attr.aria-checked]="currentLanguage === lang.code"
              [attr.aria-label]="lang.label"
              type="button">
              <span class="lang-text">{{ lang.label }}</span>
              <span class="lang-indicator" aria-hidden="true"></span>
            </button>
          </div>
          
          <!-- Theme Toggle -->
          <app-theme-toggle></app-theme-toggle>
          
          <!-- Mobile Menu Toggle -->
          <button 
            class="nav-toggle" 
            (click)="toggleMenu()"
            [class.active]="menuOpen"
            [attr.aria-expanded]="menuOpen"
            [attr.aria-label]="menuOpen ? translate('nav.close') : translate('nav.open')"
            type="button">
            <span class="hamburger-box">
              <span class="hamburger-inner" aria-hidden="true"></span>
            </span>
            <span class="toggle-text sr-only">{{ menuOpen ? translate('nav.close') : translate('nav.menu') }}</span>
          </button>
        </div>
      </nav>
      
      <!-- Progress Bar -->
      <div class="progress-bar" [style.width.%]="scrollProgress" aria-hidden="true"></div>
    </header>

    <!-- Mobile Drawer -->
    <div class="mobile-drawer" [class.open]="menuOpen" [attr.aria-hidden]="!menuOpen">
      <div class="drawer-content">
        <div class="drawer-header">
          <div class="drawer-brand">
            <span class="brand-main">AVAGH</span>
            <span class="brand-accent">MEDIA</span>
          </div>
          <button 
            class="drawer-close"
            (click)="closeMenu()"
            [attr.aria-label]="translate('nav.close')"
            type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <nav class="drawer-nav" role="navigation">
          <ul class="drawer-menu" role="menubar">
            <li role="none">
              <a href="#about" 
                 class="drawer-link" 
                 (click)="closeMenu()" 
                 role="menuitem">
                <span class="link-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
                <span class="link-text">{{ translate('nav.about') }}</span>
              </a>
            </li>
            <li role="none">
              <a href="#services" 
                 class="drawer-link" 
                 (click)="closeMenu()" 
                 role="menuitem">
                <span class="link-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </span>
                <span class="link-text">{{ translate('nav.services') }}</span>
              </a>
            </li>
            <li role="none">
              <a href="#news" 
                 class="drawer-link" 
                 (click)="closeMenu()" 
                 role="menuitem">
                <span class="link-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                  </svg>
                </span>
                <span class="link-text">{{ translate('nav.news') }}</span>
              </a>
            </li>
            <li role="none">
              <a href="#partners" 
                 class="drawer-link" 
                 (click)="closeMenu()" 
                 role="menuitem">
                <span class="link-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </span>
                <span class="link-text">{{ translate('nav.partners') }}</span>
              </a>
            </li>
            <li role="none">
              <a href="#voices" 
                 class="drawer-link" 
                 (click)="closeMenu()" 
                 role="menuitem">
                <span class="link-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                  </svg>
                </span>
                <span class="link-text">{{ translate('nav.voices') }}</span>
              </a>
            </li>
            <li role="none">
              <a href="#team" 
                 class="drawer-link" 
                 (click)="closeMenu()" 
                 role="menuitem">
                <span class="link-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                </span>
                <span class="link-text">{{ translate('nav.team') }}</span>
              </a>
            </li>
            <li role="none" class="drawer-cta">
              <a href="#contact" 
                 class="drawer-link cta" 
                 (click)="closeMenu()" 
                 role="menuitem">
                <span class="link-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                <span class="link-text">{{ translate('nav.contact') }}</span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="drawer-footer">
          <!-- Mobile Language Switcher -->
          <div class="mobile-language-switcher" 
               role="radiogroup" 
               [attr.aria-label]="translate('lang.switcher')">
            <span class="switcher-label">{{ translate('lang.choose') }}</span>
            <div class="lang-buttons">
              <button 
                *ngFor="let lang of languages; trackBy: trackByLang" 
                class="mobile-lang-btn"
                [class.active]="currentLanguage === lang.code"
                (click)="switchLanguage(lang.code)"
                role="radio"
                [attr.aria-checked]="currentLanguage === lang.code"
                [attr.aria-label]="lang.label"
                type="button">
                {{ lang.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Backdrop -->
    <div 
      class="mobile-backdrop" 
      [class.active]="menuOpen"
      (click)="closeMenu()"
      [attr.aria-hidden]="!menuOpen">
    </div>
  `,
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  menuOpen = false;
  currentLanguage = 'ar';
  scrollProgress = 0;
  
  private scrollThreshold = 20;
  private subscriptions: Subscription[] = [];

  languages = [
    { code: 'ar', label: 'عربي' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' }
  ];

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    const langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
    
    this.subscriptions.push(langSubscription);
    this.themeService.initializeTheme();
    this.calculateScrollProgress();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    // Ensure body lock is removed
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrolled = window.scrollY > this.scrollThreshold;
    if (this.isScrolled !== scrolled) {
      this.isScrolled = scrolled;
    }
    this.calculateScrollProgress();
  }

  @HostListener('window:resize')
  onResize() {
    // Close menu on desktop breakpoint
    if (window.innerWidth > 968 && this.menuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.menuOpen) {
      this.closeMenu();
    }
  }

  private calculateScrollProgress(): void {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const trackLength = documentHeight - windowHeight;
    
    this.scrollProgress = Math.min((scrollTop / trackLength) * 100, 100);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.updateBodyScrollLock();
    
    // Focus management for accessibility
    if (this.menuOpen) {
      setTimeout(() => {
        const firstMenuItem = document.querySelector('.drawer-link') as HTMLElement;
        firstMenuItem?.focus();
      }, 300);
    }
    
    const message = this.menuOpen ? 
      this.translate('nav.menu.opened') : 
      this.translate('nav.menu.closed');
    this.announceToScreenReader(message);
  }

  closeMenu() {
    this.menuOpen = false;
    this.updateBodyScrollLock();
    
    // Return focus to menu toggle
    setTimeout(() => {
      const menuToggle = document.querySelector('.nav-toggle') as HTMLElement;
      menuToggle?.focus();
    }, 100);
  }

  private updateBodyScrollLock() {
    if (this.menuOpen) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
      // Prevent background scrolling on iOS
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
    
    // Close mobile menu if open
    if (this.menuOpen && window.innerWidth <= 968) {
      this.closeMenu();
    }
    
    // Smooth scroll to top after language change
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    if (this.menuOpen) {
      this.closeMenu();
    }
  }

  private announceToScreenReader(message: string): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  trackByLang(index: number, lang: any): string {
    return lang.code;
  }
}