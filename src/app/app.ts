import { Component, signal, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { ServicesComponent } from './components/services/services';
import { NewsComponent } from './components/news/news';
import { PartnersComponent } from './components/partners/partners';
import { VoicesComponent } from './components/voices/voices';
import { ContactComponent } from './components/contact/contact';
import { TeamsComponent } from './components/teams/teams';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    NewsComponent,
    PartnersComponent,
    VoicesComponent,
    TeamsComponent,
    ContactComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  // Signal-based reactive state
  protected readonly title = signal('Avagh Media - Modern Media Solutions');
  protected readonly currentLanguage = signal('ar');
  protected readonly currentTheme = signal<'light' | 'dark' | 'auto'>('auto');
  protected readonly isDark = signal(false);
  protected readonly isRTL = signal(true);
  protected readonly isLoading = signal(true);
  protected readonly showScrollTop = signal(false);
  
  // Development debug mode
  protected readonly showDebug = signal(false); // Set to true for development

  private subscriptions: Subscription[] = [];
  private scrollThreshold = 300;

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.initializeSubscriptions();
    this.initializeAccessibilityFeatures();
    this.initializePerformanceOptimizations();
    
    // Hide loading overlay after initialization
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private initializeSubscriptions() {
    // Language service subscriptions
    const langSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage.set(lang);
      this.isRTL.set(lang === 'ar');
      this.updateDocumentAttributes();
    });

    // Theme service subscriptions
    const themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme.set(theme);
      this.updateDocumentAttributes();
    });

    const isDarkSubscription = this.themeService.isDark$.subscribe(isDark => {
      this.isDark.set(isDark);
      this.updateDocumentAttributes();
    });

    this.subscriptions.push(langSubscription, themeSubscription, isDarkSubscription);
  }

  private initializeAccessibilityFeatures() {
    // Announce route changes to screen readers
    // Add focus management for better keyboard navigation
    this.setupKeyboardNavigation();
    this.setupScreenReaderAnnouncements();
  }

  private initializePerformanceOptimizations() {
    // Implement intersection observer for lazy loading
    // Add performance monitoring
    this.setupIntersectionObservers();
  }

  private updateDocumentAttributes() {
    const html = document.documentElement;
    const body = document.body;
    
    // Update language and direction
    html.lang = this.currentLanguage();
    html.dir = this.isRTL() ? 'rtl' : 'ltr';
    
    // Update theme attributes
    html.setAttribute('data-theme', this.isDark() ? 'dark' : 'light');
    html.setAttribute('data-language', this.currentLanguage());
    
    // Update body classes for styling hooks
    body.className = this.appClasses();
  }

  private setupKeyboardNavigation() {
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (event) => {
      // Handle escape key globally
      if (event.key === 'Escape') {
        this.handleEscapeKey();
      }
    });
  }

  private setupScreenReaderAnnouncements() {
    // Setup live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-announcements';
    document.body.appendChild(liveRegion);
  }

  private setupIntersectionObservers() {
    // Setup observers for animations and lazy loading
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      });

      // Observe elements with animation classes
      document.querySelectorAll('[data-animate]').forEach(el => {
        animationObserver.observe(el);
      });
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.showScrollTop.set(scrollTop > this.scrollThreshold);
  }

  @HostListener('window:resize')
  onResize() {
    // Handle responsive breakpoint changes
    this.updateResponsiveClasses();
  }

  private updateResponsiveClasses() {
    const width = window.innerWidth;
    const html = document.documentElement;
    
    // Add responsive class helpers
    html.classList.toggle('mobile', width < 768);
    html.classList.toggle('tablet', width >= 768 && width < 1024);
    html.classList.toggle('desktop', width >= 1024);
  }

  private handleEscapeKey() {
    // Handle global escape key actions
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement.blur) {
      activeElement.blur();
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Announce to screen readers
    this.announceToScreenReader(this.translate('accessibility.scrolledToTop'));
  }

  private announceToScreenReader(message: string) {
    const liveRegion = document.getElementById('live-announcements');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  // Computed app classes
  appClasses() {
    return [
      this.currentLanguage(),
      this.currentTheme(),
      this.isDark() ? 'theme-dark' : 'theme-light',
      this.isRTL() ? 'rtl' : 'ltr',
      this.isLoading() ? 'loading' : 'loaded'
    ].join(' ');
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}