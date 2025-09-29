import { Component, OnInit, Inject, DOCUMENT } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  hoverColor: string;
}

interface FooterLink {
  text: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule],
  template: `
    <footer class="footer" role="contentinfo">
      <div class="container">
        
        <!-- Newsletter Section -->
        <div class="footer-newsletter" [attr.data-aos]="'fade-up'">
          <h3 class="newsletter-title">{{ getNewsletterTitle() }}</h3>
          <p class="newsletter-description">{{ getNewsletterDescription() }}</p>
          <form class="newsletter-form" (ngSubmit)="onNewsletterSubmit($event)" #newsletterForm="ngForm">
            <div class="newsletter-input-group">
              <input 
                type="email" 
                name="email"
                [(ngModel)]="newsletterEmail"
                required
                class="newsletter-input"
                [placeholder]="getNewsletterPlaceholder()"
                [attr.aria-label]="getNewsletterInputLabel()"
              />
              <button 
                type="submit" 
                class="newsletter-btn"
                [disabled]="newsletterLoading"
                [attr.aria-label]="getNewsletterButtonLabel()">
                <span *ngIf="!newsletterLoading">{{ getSubscribeText() }}</span>
                <div *ngIf="newsletterLoading" class="loading-spinner" aria-hidden="true"></div>
              </button>
            </div>
            <p class="newsletter-privacy">{{ getPrivacyNote() }}</p>
          </form>
        </div>
        
        <!-- Main Footer Content -->
        <div class="footer-content">
          
          <!-- Brand Section -->
          <div class="footer-brand" [attr.data-aos]="'fade-right'">
            <div class="brand-container">
              <h2 class="brand-text">AVAGH MEDIA</h2>
              <p class="brand-tagline">{{ getBrandTagline() }}</p>
            </div>
            <p class="brand-description">{{ getBrandDescription() }}</p>
            
            <!-- Contact Quick Info -->
            <div class="quick-contact">
              <div class="contact-item">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>hello@avaghmedia.mr</span>
              </div>
              <div class="contact-item">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>+222 XX XX XX XX</span>
              </div>
            </div>
            
            <!-- Social Media Links -->
            <div class="social-links">
              <h4>{{ getFollowUsText() }}</h4>
              <div class="social-icons">
                <a 
                  *ngFor="let social of socialLinks; trackBy: trackBySocial" 
                  [href]="social.url"
                  class="social-link"
                  [attr.aria-label]="getFollowLabel(social.name)"
                  target="_blank"
                  rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path [attr.d]="social.icon"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer Links -->
          <div class="footer-links" [attr.data-aos]="'fade-left'" [attr.data-aos-delay]="'200'">
            <div 
              class="link-column" 
              *ngFor="let column of getLocalizedLinkColumns(); trackBy: trackByColumn; index as i"
              [attr.data-aos]="'fade-up'"
              [attr.data-aos-delay]="(i + 1) * 100">
              <h4 class="column-title">{{ column.title }}</h4>
              <nav>
                <ul class="link-list" role="list">
                  <li *ngFor="let link of column.links; trackBy: trackByLink" role="listitem">
                    <a [href]="link.url" class="footer-link">{{ link.text }}</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        
        <!-- Footer Bottom -->
        <div class="footer-bottom" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'600'">
          <div class="footer-bottom-content">
            <div class="copyright">
              <p>&copy; {{ currentYear }} AVAGH MEDIA. {{ getCopyright() }}</p>
            </div>
            
            <!-- Theme Toggle -->
            <div class="theme-controls">
              <button 
                class="theme-toggle"
                type="button"
                (click)="toggleTheme()"
                [attr.aria-label]="getThemeToggleLabel()"
                [attr.aria-pressed]="isDarkMode">
                <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
                <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              </button>
            </div>
            
            <div class="footer-legal">
              <nav>
                <ul class="legal-links" role="list">
                  <li *ngFor="let legal of getLegalLinks(); trackBy: trackByLegal" role="listitem">
                    <a href="#" class="legal-link">{{ legal }}</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        
        <!-- Back to Top Button -->
        <button 
          class="back-to-top"
          [class.visible]="showBackToTop"
          type="button"
          (click)="scrollToTop()"
          [attr.aria-label]="getBackToTopLabel()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
          </svg>
        </button>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.scss']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  newsletterEmail = '';
  newsletterLoading = false;
  showBackToTop = false;
  isDarkMode = false;

  socialLinks: SocialLink[] = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/avaghmedia',
      icon: 'M18.77 7.46H15.5v-1.9c0-.9.6-1.1 1-1.1h2.27V2.56L15.5 2.5c-2.89 0-3.5 2.16-3.5 3.54v1.42H10v2.9h2v7.6h3.5v-7.6h2.77l.5-2.9z',
      hoverColor: '#1877f2'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/avaghmedia',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      hoverColor: '#e4405f'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/avaghmedia',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
      hoverColor: '#0077b5'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@avaghmedia',
      icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
      hoverColor: '#ff0000'
    }
  ];

  constructor(
    private languageService: LanguageService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    // Initialize theme from localStorage
    this.initializeTheme();
    
    // Listen for scroll events
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  private initializeTheme(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isDarkMode = true;
        this.document.documentElement.classList.add('dark');
      } else if (savedTheme === 'light') {
        this.isDarkMode = false;
        this.document.documentElement.classList.remove('dark');
      } else {
        // Auto-detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode = prefersDark;
        if (prefersDark) {
          this.document.documentElement.classList.add('dark');
        }
      }
    }
  }

  private onScroll(): void {
    this.showBackToTop = window.scrollY > 300;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      this.document.documentElement.classList.add('dark');
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('theme', 'dark');
      }
    } else {
      this.document.documentElement.classList.remove('dark');
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('theme', 'light');
      }
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  async onNewsletterSubmit(event: Event): Promise<void> {
    event.preventDefault();
    
    if (!this.newsletterEmail || this.newsletterLoading) return;

    this.newsletterLoading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      this.newsletterEmail = '';
      // Could show success message here
      
    } catch (error) {
      // Handle error
      console.error('Newsletter subscription failed:', error);
    } finally {
      this.newsletterLoading = false;
    }
  }

  // Localized content methods
  getBrandTagline(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const taglines = {
      ar: 'إبداع • جودة • شراكة',
      en: 'Creativity • Quality • Partnership',
      fr: 'Créativité • Qualité • Partenariat'
    };
    return taglines[currentLang as keyof typeof taglines];
  }

  getBrandDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'شريككم الموثوق في الحلول الإعلامية والتسويقية المبتكرة. نحن نؤمن بقوة القصص المؤثرة وقدرتها على تحويل الأعمال.',
      en: 'Your trusted partner in innovative media and marketing solutions. We believe in the power of compelling stories and their ability to transform businesses.',
      fr: 'Votre partenaire de confiance pour des solutions médiatiques et marketing innovantes. Nous croyons au pouvoir des histoires captivantes et à leur capacité à transformer les entreprises.'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  getNewsletterTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'ابق على اطلاع',
      en: 'Stay in the Loop',
      fr: 'Restez Informés'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getNewsletterDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'احصل على آخر الأخبار، النصائح الإبداعية، ومعلومات حصرية عن مشاريعنا الجديدة مباشرة في بريدك الإلكتروني.',
      en: 'Get the latest news, creative tips, and exclusive insights about our new projects delivered straight to your inbox.',
      fr: 'Recevez les dernières nouvelles, conseils créatifs et informations exclusives sur nos nouveaux projets directement dans votre boîte de réception.'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  getNewsletterPlaceholder(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const placeholders = {
      ar: 'أدخل بريدك الإلكتروني',
      en: 'Enter your email address',
      fr: 'Entrez votre adresse email'
    };
    return placeholders[currentLang as keyof typeof placeholders];
  }

  getSubscribeText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'اشتراك',
      en: 'Subscribe',
      fr: 'S\'abonner'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getPrivacyNote(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const notes = {
      ar: 'نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.',
      en: 'We respect your privacy. You can unsubscribe at any time.',
      fr: 'Nous respectons votre confidentialité. Vous pouvez vous désabonner à tout moment.'
    };
    return notes[currentLang as keyof typeof notes];
  }

  getFollowUsText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'تابعنا',
      en: 'Follow Us',
      fr: 'Suivez-nous'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getCopyright(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const copyrights = {
      ar: 'جميع الحقوق محفوظة.',
      en: 'All rights reserved.',
      fr: 'Tous droits réservés.'
    };
    return copyrights[currentLang as keyof typeof copyrights];
  }

  getThemeToggleLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: this.isDarkMode ? 'التبديل للوضع المضيء' : 'التبديل للوضع المظلم',
      en: this.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode',
      fr: this.isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getBackToTopLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'العودة إلى الأعلى',
      en: 'Back to top',
      fr: 'Retour en haut'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getLocalizedLinkColumns(): FooterColumn[] {
    const currentLang = this.languageService.getCurrentLanguage();
    const columns = {
      ar: [
        {
          title: 'خدماتنا',
          links: [
            { text: 'الإعلام والإنتاج', url: '#services' },
            { text: 'التسويق والإعلان', url: '#services' },
            { text: 'العلاقات العامة', url: '#services' },
            { text: 'الاستشارات الإعلامية', url: '#services' }
          ]
        },
        {
          title: 'الشركة',
          links: [
            { text: 'من نحن', url: '#about' },
            { text: 'فريقنا', url: '#team' },
            { text: 'أعمالنا', url: '#portfolio' },
            { text: 'الأخبار', url: '#news' }
          ]
        },
        {
          title: 'الدعم',
          links: [
            { text: 'تواصل معنا', url: '#contact' },
            { text: 'الأسئلة الشائعة', url: '#faq' },
            { text: 'المساعدة', url: '#help' },
            { text: 'الوظائف', url: '#careers' }
          ]
        }
      ],
      en: [
        {
          title: 'Our Services',
          links: [
            { text: 'Media & Production', url: '#services' },
            { text: 'Marketing & Advertising', url: '#services' },
            { text: 'Public Relations', url: '#services' },
            { text: 'Media Consulting', url: '#services' }
          ]
        },
        {
          title: 'Company',
          links: [
            { text: 'About Us', url: '#about' },
            { text: 'Our Team', url: '#team' },
            { text: 'Our Work', url: '#portfolio' },
            { text: 'News', url: '#news' }
          ]
        },
        {
          title: 'Support',
          links: [
            { text: 'Contact Us', url: '#contact' },
            { text: 'FAQ', url: '#faq' },
            { text: 'Help', url: '#help' },
            { text: 'Careers', url: '#careers' }
          ]
        }
      ],
      fr: [
        {
          title: 'Nos Services',
          links: [
            { text: 'Médias & Production', url: '#services' },
            { text: 'Marketing & Publicité', url: '#services' },
            { text: 'Relations Publiques', url: '#services' },
            { text: 'Conseil Médiatique', url: '#services' }
          ]
        },
        {
          title: 'Entreprise',
          links: [
            { text: 'À Propos', url: '#about' },
            { text: 'Notre Équipe', url: '#team' },
            { text: 'Nos Réalisations', url: '#portfolio' },
            { text: 'Actualités', url: '#news' }
          ]
        },
        {
          title: 'Support',
          links: [
            { text: 'Nous Contacter', url: '#contact' },
            { text: 'FAQ', url: '#faq' },
            { text: 'Aide', url: '#help' },
            { text: 'Carrières', url: '#careers' }
          ]
        }
      ]
    };
    return columns[currentLang as keyof typeof columns];
  }

  getLegalLinks(): string[] {
    const currentLang = this.languageService.getCurrentLanguage();
    const links = {
      ar: ['سياسة الخصوصية', 'شروط الاستخدام', 'الأحكام القانونية'],
      en: ['Privacy Policy', 'Terms of Service', 'Legal Notice'],
      fr: ['Politique de Confidentialité', 'Conditions d\'Utilisation', 'Mentions Légales']
    };
    return links[currentLang as keyof typeof links];
  }

  // Accessibility labels
  getNewsletterInputLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'البريد الإلكتروني للاشتراك',
      en: 'Email for subscription',
      fr: 'Email pour l\'abonnement'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getNewsletterButtonLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'الاشتراك في النشرة الإخبارية',
      en: 'Subscribe to newsletter',
      fr: 'S\'abonner à la newsletter'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getFollowLabel(platform: string): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: `تابعنا على ${platform}`,
      en: `Follow us on ${platform}`,
      fr: `Suivez-nous sur ${platform}`
    };
    return labels[currentLang as keyof typeof labels];
  }

  // Tracking functions
  trackBySocial(index: number, social: SocialLink): string {
    return social.name;
  }

  trackByColumn(index: number, column: FooterColumn): string {
    return column.title;
  }

  trackByLink(index: number, link: FooterLink): string {
    return link.text;
  }

  trackByLegal(index: number, legal: string): string {
    return legal;
  }
}