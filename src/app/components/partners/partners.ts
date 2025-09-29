import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  tags: string[];
  website?: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="partners" class="partners" role="region" [attr.aria-labelledby]="'partners-title'">
      <!-- Background Elements -->
      <div class="partners-background" aria-hidden="true">
        <div class="gradient-mesh"></div>
        <div class="floating-elements">
          <div class="floating-element" *ngFor="let element of floatingElements; trackBy: trackByElement"></div>
        </div>
      </div>
      
      <div class="container">
        <header class="section-header" [attr.data-aos]="'fade-up'">
          <h2 id="partners-title" class="section-title">{{ getSectionTitle() }}</h2>
          <p class="section-subtitle">{{ getSectionSubtitle() }}</p>
        </header>
        
        <!-- Partners Grid -->
        <div class="partners-grid" role="list">
          <article 
            class="partner-card" 
            *ngFor="let partner of getLocalizedPartners(); trackBy: trackByPartner; index as i"
            [attr.data-aos]="'fade-up'"
            [attr.data-aos-delay]="i * 150"
            role="listitem">
            
            <div class="partner-logo">
              <img 
                [src]="partner.logo" 
                [alt]="partner.name + ' logo'"
                loading="lazy"
              />
            </div>
            
            <h3 class="partner-name">{{ partner.name }}</h3>
            <p class="partner-description">{{ partner.description }}</p>
            
            <div class="partner-tags">
              <span 
                class="tag" 
                *ngFor="let tag of partner.tags; trackBy: trackByTag">
                {{ tag }}
              </span>
            </div>
            
            <button 
              class="partner-btn"
              type="button"
              (click)="visitPartnerWebsite(partner)"
              [attr.aria-label]="getVisitWebsiteLabel() + ' ' + partner.name">
              <span>{{ getVisitWebsiteText() }}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </button>
          </article>
        </div>
        
        <!-- Partners Logos Marquee -->
        <div class="partners-marquee" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'400'">
          <div class="marquee-container">
            <div class="logos-scroll" [attr.aria-label]="getMarqueeLabel()">
              <div 
                class="logo-item" 
                *ngFor="let logo of getPartnerLogos(); trackBy: trackByLogo; let i = index"
                [attr.data-index]="i">
                <img 
                  [src]="logo.url" 
                  [alt]="logo.name"
                  loading="lazy"
                />
              </div>
              <!-- Duplicate for seamless loop -->
              <div 
                class="logo-item" 
                *ngFor="let logo of getPartnerLogos(); trackBy: trackByLogo; let i = index"
                [attr.data-index]="i">
                <img 
                  [src]="logo.url" 
                  [alt]="logo.name"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Partners CTA -->
        <div class="partners-cta" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'600'">
          <h3 class="cta-title">{{ getCtaTitle() }}</h3>
          <p class="cta-description">{{ getCtaDescription() }}</p>
          <button 
            class="cta-button"
            type="button"
            (click)="scrollToContact()"
            [attr.aria-label]="getCtaButtonLabel()">
            <span>{{ getCtaButtonText() }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./partners.scss']
})
export class PartnersComponent implements OnInit {
  floatingElements = Array(8).fill(0).map((_, i) => ({ id: i }));

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Initialize component
  }

  getSectionTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'شركاؤنا',
      en: 'Our Partners',
      fr: 'Nos Partenaires'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getSectionSubtitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const subtitles = {
      ar: 'نفتخر بالعمل مع أفضل الشركات والمؤسسات',
      en: 'We are proud to work with the best companies and institutions',
      fr: 'Nous sommes fiers de travailler avec les meilleures entreprises et institutions'
    };
    return subtitles[currentLang as keyof typeof subtitles];
  }

  getVisitWebsiteText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'زيارة الموقع',
      en: 'Visit Website',
      fr: 'Visiter le Site'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getVisitWebsiteLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'زيارة موقع الشريك',
      en: 'Visit partner website',
      fr: 'Visiter le site du partenaire'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getMarqueeLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'قائمة شركائنا',
      en: 'Our partners list',
      fr: 'Liste de nos partenaires'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getCtaTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'كن شريكنا القادم',
      en: 'Become Our Next Partner',
      fr: 'Devenez Notre Prochain Partenaire'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getCtaDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'انضم إلى شبكة شركائنا المتميزين وابنِ معنا شراكة ناجحة',
      en: 'Join our network of distinguished partners and build a successful partnership with us',
      fr: 'Rejoignez notre réseau de partenaires distingués et construisez un partenariat réussi avec nous'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  getCtaButtonText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'تواصل معنا',
      en: 'Contact Us',
      fr: 'Contactez-Nous'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getCtaButtonLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'الانتقال إلى صفحة التواصل',
      en: 'Go to contact page',
      fr: 'Aller à la page de contact'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getLocalizedPartners(): Partner[] {
    const currentLang = this.languageService.getCurrentLanguage();
    const partners = {
      ar: [
        {
          id: 1,
          name: 'Tasiast',
          logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
          description: 'شراكة استراتيجية في مجال الإنتاج الإعلامي والتطوير المؤسسي',
          tags: ['إعلام', 'إنتاج', 'تطوير'],
          website: 'https://tasiast.com'
        },
        {
          id: 2,
          name: 'Port de Tanit',
          logo: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&h=100&fit=crop',
          description: 'تعاون مثمر في تطوير المحتوى والتسويق الرقمي',
          tags: ['تسويق', 'محتوى', 'رقمي'],
          website: 'https://port-tanit.com'
        },
        {
          id: 3,
          name: 'MAADEN',
          logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          description: 'شراكة في مجال الاستشارات الإعلامية والتطوير',
          tags: ['استشارات', 'تطوير', 'إعلام'],
          website: 'https://maaden.com'
        },
        {
          id: 4,
          name: 'edUKate Mauritanie',
          logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop',
          description: 'تعاون في المجال التعليمي والمحتوى التربوي',
          tags: ['تعليم', 'محتوى', 'تربوي'],
          website: 'https://edukate-mauritanie.com'
        }
      ],
      en: [
        {
          id: 1,
          name: 'Tasiast',
          logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
          description: 'Strategic partnership in media production and institutional development',
          tags: ['Media', 'Production', 'Development'],
          website: 'https://tasiast.com'
        },
        {
          id: 2,
          name: 'Port de Tanit',
          logo: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&h=100&fit=crop',
          description: 'Fruitful collaboration in content development and digital marketing',
          tags: ['Marketing', 'Content', 'Digital'],
          website: 'https://port-tanit.com'
        },
        {
          id: 3,
          name: 'MAADEN',
          logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          description: 'Partnership in media consulting and development',
          tags: ['Consulting', 'Development', 'Media'],
          website: 'https://maaden.com'
        },
        {
          id: 4,
          name: 'edUKate Mauritanie',
          logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop',
          description: 'Collaboration in education and educational content',
          tags: ['Education', 'Content', 'Educational'],
          website: 'https://edukate-mauritanie.com'
        }
      ],
      fr: [
        {
          id: 1,
          name: 'Tasiast',
          logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
          description: 'Partenariat stratégique dans la production médiatique et le développement institutionnel',
          tags: ['Médias', 'Production', 'Développement'],
          website: 'https://tasiast.com'
        },
        {
          id: 2,
          name: 'Port de Tanit',
          logo: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&h=100&fit=crop',
          description: 'Collaboration fructueuse dans le développement de contenu et le marketing digital',
          tags: ['Marketing', 'Contenu', 'Digital'],
          website: 'https://port-tanit.com'
        },
        {
          id: 3,
          name: 'MAADEN',
          logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          description: 'Partenariat dans le conseil médiatique et le développement',
          tags: ['Conseil', 'Développement', 'Médias'],
          website: 'https://maaden.com'
        },
        {
          id: 4,
          name: 'edUKate Mauritanie',
          logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop',
          description: 'Collaboration dans l\'éducation et le contenu éducatif',
          tags: ['Éducation', 'Contenu', 'Éducatif'],
          website: 'https://edukate-mauritanie.com'
        }
      ]
    };
    return partners[currentLang as keyof typeof partners];
  }

  getPartnerLogos() {
    return [
      { name: 'Tasiast', url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&h=60&fit=crop' },
      { name: 'Port de Tanit', url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=120&h=60&fit=crop' },
      { name: 'MAADEN', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=60&fit=crop' },
      { name: 'edUKate Mauritanie', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=120&h=60&fit=crop' },
      { name: 'Partner 5', url: 'https://via.placeholder.com/120x60?text=Logo5' },
      { name: 'Partner 6', url: 'https://via.placeholder.com/120x60?text=Logo6' },
      { name: 'Partner 7', url: 'https://via.placeholder.com/120x60?text=Logo7' },
      { name: 'Partner 8', url: 'https://via.placeholder.com/120x60?text=Logo8' }
    ];
  }

  visitPartnerWebsite(partner: Partner) {
    if (partner.website) {
      window.open(partner.website, '_blank', 'noopener,noreferrer');
    }
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  trackByElement(index: number, element: any): number {
    return element.id;
  }

  trackByPartner(index: number, partner: Partner): number {
    return partner.id;
  }

  trackByTag(index: number, tag: string): string {
    return tag;
  }

  trackByLogo(index: number, logo: any): string {
    return logo.name;
  }
}