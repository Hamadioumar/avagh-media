import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="hero" role="banner">
      <div class="hero-background" aria-hidden="true">
        <div class="gradient-mesh"></div>
        <div class="floating-elements">
          <div class="floating-element" *ngFor="let element of floatingElements; trackBy: trackByElement"></div>
        </div>
      </div>
      
      <div class="container hero-content">
        <div class="hero-text" [attr.data-aos]="'fade-up'">
          <h1 class="hero-title">
            <span class="title-line" [innerHTML]="getAnimatedTitle()"></span>
          </h1>
          <p class="hero-subtitle" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'200'">
            {{ translate('hero.subtitle') }}
          </p>
          <div class="hero-buttons" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'400'">
            <button 
              class="btn btn-primary"
              (click)="scrollToSection('contact')"
              [attr.aria-label]="translate('hero.cta.primary.aria')"
              type="button">
              <span>{{ translate('hero.cta.primary') }}</span>
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
            <button 
              class="btn btn-secondary"
              (click)="scrollToSection('about')"
              [attr.aria-label]="translate('hero.cta.secondary.aria')"
              type="button">
              <span>{{ translate('hero.cta.secondary') }}</span>
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a4 4 0 100-8 4 4 0 00-4 4v4h1"/>
              </svg>
            </button>
          </div>
          
          <!-- Trust indicators -->
          <div class="trust-indicators" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'600'">
            <div class="trust-item" *ngFor="let indicator of getTrustIndicators(); trackBy: trackByTrust">
              <div class="trust-number">{{ indicator.number }}</div>
              <div class="trust-label">{{ indicator.label }}</div>
            </div>
          </div>
        </div>
        
        <div class="hero-visual" [attr.data-aos]="'fade-left'" [attr.data-aos-delay]="'300'">
          <div class="visual-card">
            <div class="card-glow" aria-hidden="true"></div>
            <div class="card-content">
              <div class="icon-wrapper">
                <svg viewBox="0 0 24 24" fill="currentColor" class="icon" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <h3>{{ getCardTitle() }}</h3>
              <p>{{ getCardDescription() }}</p>
              
              <!-- Interactive features showcase -->
              <div class="features-preview">
                <div 
                  class="feature-item" 
                  *ngFor="let feature of getFeatures(); trackBy: trackByFeature"
                  [style.animation-delay.ms]="feature.delay">
                  <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path [attr.d]="feature.icon"/>
                    </svg>
                  </div>
                  <span>{{ feature.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="scroll-indicator" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'800'">
        <button 
          class="scroll-btn"
          (click)="scrollToSection('about')"
          [attr.aria-label]="translate('scroll.next')"
          type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </button>
        <span class="scroll-text">{{ translate('scroll.explore') }}</span>
      </div>
    </section>
  `,
  styleUrls: ['./hero.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  floatingElements = Array(8).fill(0).map((_, i) => ({ id: i }));
  
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.initializeAnimations();
  }

  ngOnDestroy() {
    // Cleanup any running animations
  }

  private initializeAnimations() {
    // Initialize any complex animations here
  }

  getAnimatedTitle(): string {
    const title = this.translate('hero.title');
    // Split into words for potential word-by-word animation
    return title;
  }

  getCardTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'إنتاج إعلامي مبتكر',
      en: 'Innovative Media Production',
      fr: 'Production médiatique innovante'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getCardDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'نحول أفكارك إلى محتوى إعلامي مؤثر باستخدام أحدث التقنيات والإبداع.',
      en: 'We transform your ideas into impactful media content using cutting-edge technology and creativity.',
      fr: 'Nous transformons vos idées en contenu médiatique percutant grâce aux dernières technologies et à la créativité.'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  getTrustIndicators() {
    const currentLang = this.languageService.getCurrentLanguage();
    const indicators = {
      ar: [
        { number: '50+', label: 'مشروع مُنجز' },
        { number: '25+', label: 'عميل سعيد' },
        { number: '5+', label: 'سنوات خبرة' }
      ],
      en: [
        { number: '50+', label: 'Projects Done' },
        { number: '25+', label: 'Happy Clients' },
        { number: '5+', label: 'Years Experience' }
      ],
      fr: [
        { number: '50+', label: 'Projets Réalisés' },
        { number: '25+', label: 'Clients Satisfaits' },
        { number: '5+', label: 'Années d\'Expérience' }
      ]
    };
    return indicators[currentLang as keyof typeof indicators];
  }

  getFeatures() {
    const currentLang = this.languageService.getCurrentLanguage();
    const features = {
      ar: [
        { 
          icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', 
          label: 'فيديو احترافي', 
          delay: 0 
        },
        { 
          icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z', 
          label: 'تسويق رقمي', 
          delay: 200 
        },
        { 
          icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', 
          label: 'أفكار مبتكرة', 
          delay: 400 
        }
      ],
      en: [
        { 
          icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', 
          label: 'Professional Video', 
          delay: 0 
        },
        { 
          icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z', 
          label: 'Digital Marketing', 
          delay: 200 
        },
        { 
          icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', 
          label: 'Creative Ideas', 
          delay: 400 
        }
      ],
      fr: [
        { 
          icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', 
          label: 'Vidéo Professionnelle', 
          delay: 0 
        },
        { 
          icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z', 
          label: 'Marketing Digital', 
          delay: 200 
        },
        { 
          icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', 
          label: 'Idées Créatives', 
          delay: 400 
        }
      ]
    };
    return features[currentLang as keyof typeof features];
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  trackByElement(index: number, element: any): number {
    return element.id;
  }

  trackByTrust(index: number, trust: any): string {
    return trust.number;
  }

  trackByFeature(index: number, feature: any): string {
    return feature.label;
  }

}