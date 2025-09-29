import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="services" [attr.aria-labelledby]="'services-title'">
      <div class="container">
        <header class="section-header" [attr.data-aos]="'fade-up'">
          <h2 id="services-title" class="section-title">{{ translate('services.title') }}</h2>
          <p class="section-subtitle">{{ translate('services.subtitle') }}</p>
        </header>
        
        <div class="services-grid" role="list">
          <article 
            class="service-card" 
            *ngFor="let service of getLocalizedServices(); trackBy: trackByService; index as i"
            [attr.data-aos]="'fade-up'"
            [attr.data-aos-delay]="i * 200"
            role="listitem">
            
            <header class="card-header">
              <div class="icon-wrapper" [ngClass]="getIconClass(service.id)">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  class="icon"
                  [attr.aria-label]="service.title"
                  role="img">
                  <path [attr.d]="service.icon"/>
                </svg>
              </div>
              <h3>{{ service.title }}</h3>
            </header>
            
            <div class="card-content">
              <p class="service-description">{{ service.description }}</p>
              
              <ul class="service-features" role="list">
                <li 
                  *ngFor="let feature of service.features; trackBy: trackByFeature" 
                  role="listitem">
                  <span class="feature-check" aria-hidden="true">✓</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
              
              <div class="service-metrics" *ngIf="service.metrics">
                <div 
                  class="metric-item" 
                  *ngFor="let metric of service.metrics; trackBy: trackByMetric">
                  <span class="metric-value">{{ metric.value }}</span>
                  <span class="metric-label">{{ metric.label }}</span>
                </div>
              </div>
            </div>
            
            <footer class="card-footer">
              <button 
                class="service-btn"
                type="button"
                (click)="onServiceClick(service.id)"
                [attr.aria-label]="getLearnMoreText() + ' ' + service.title">
                <span>{{ getLearnMoreText() }}</span>
                <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </button>
            </footer>
          </article>
        </div>
        
        <!-- Call to Action Section -->
        <div class="services-cta" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'600'">
          <h3 class="cta-title">{{ getCtaTitle() }}</h3>
          <p class="cta-description">{{ getCtaDescription() }}</p>
          <button 
            class="cta-button"
            type="button"
            (click)="scrollToContact()"
            [attr.aria-label]="getCtaButtonText()">
            <span>{{ getCtaButtonText() }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./services.scss']
})
export class ServicesComponent implements OnInit {
  
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Initialize any component-specific logic
  }

  getLocalizedServices() {
    const currentLang = this.languageService.getCurrentLanguage();
    const services = {
      ar: [
        {
          id: 1,
          title: 'الإعلام والإنتاج',
          description: 'إنتاج محتوى إعلامي احترافي، وثائقيات، وأفلام ترويجية عالية الجودة تحكي قصتك بطريقة مؤثرة.',
          icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
          features: [
            'إنتاج فيديوهات ترويجية',
            'الوثائقيات المؤسسية',
            'تغطية الأحداث المباشرة',
            'المونتاج والإخراج'
          ],
          metrics: [
            { value: '50+', label: 'فيديو منتج' },
            { value: '15+', label: 'وثائقي' }
          ]
        },
        {
          id: 2,
          title: 'التسويق والإعلان',
          description: 'استراتيجيات تسويقية رقمية مبتكرة وحملات إعلانية مؤثرة لبناء علامتك التجارية وتحقيق أهدافك.',
          icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
          features: [
            'استراتيجية التسويق الرقمي',
            'إدارة منصات التواصل',
            'تصميم الحملات الإعلانية',
            'تطوير الهوية البصرية'
          ],
          metrics: [
            { value: '25+', label: 'حملة ناجحة' },
            { value: '100K+', label: 'متابع وصلنا إليه' }
          ]
        },
        {
          id: 3,
          title: 'العلاقات العامة',
          description: 'إدارة الصورة المؤسسية والتواصل الفعال مع الجمهور ووسائل الإعلام لبناء سمعة قوية ومستدامة.',
          icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
          features: [
            'إدارة الأزمات والسمعة',
            'العلاقات الإعلامية',
            'تنظيم الفعاليات',
            'التواصل المؤسسي'
          ],
          metrics: [
            { value: '30+', label: 'فعالية نُظمت' },
            { value: '95%', label: 'رضا العملاء' }
          ]
        }
      ],
      en: [
        {
          id: 1,
          title: 'Media & Production',
          description: 'Professional media content production, documentaries, and high-quality promotional films that tell your story in an impactful way.',
          icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
          features: [
            'Promotional video production',
            'Corporate documentaries',
            'Live event coverage',
            'Editing & post-production'
          ],
          metrics: [
            { value: '50+', label: 'Videos produced' },
            { value: '15+', label: 'Documentaries' }
          ]
        },
        {
          id: 2,
          title: 'Marketing & Advertising',
          description: 'Innovative digital marketing strategies and impactful advertising campaigns to build your brand and achieve your goals.',
          icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
          features: [
            'Digital marketing strategy',
            'Social media management',
            'Advertising campaign design',
            'Brand identity development'
          ],
          metrics: [
            { value: '25+', label: 'Successful campaigns' },
            { value: '100K+', label: 'People reached' }
          ]
        },
        {
          id: 3,
          title: 'Public Relations',
          description: 'Corporate image management and effective communication with audiences and media to build a strong and sustainable reputation.',
          icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
          features: [
            'Crisis & reputation management',
            'Media relations',
            'Event organization',
            'Corporate communication'
          ],
          metrics: [
            { value: '30+', label: 'Events organized' },
            { value: '95%', label: 'Client satisfaction' }
          ]
        }
      ],
      fr: [
        {
          id: 1,
          title: 'Médias & Production',
          description: 'Production de contenu médiatique professionnel, documentaires et films promotionnels de haute qualité qui racontent votre histoire de manière percutante.',
          icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
          features: [
            'Production vidéos promotionnelles',
            'Documentaires corporatifs',
            'Couverture événements live',
            'Montage & post-production'
          ],
          metrics: [
            { value: '50+', label: 'Vidéos produites' },
            { value: '15+', label: 'Documentaires' }
          ]
        },
        {
          id: 2,
          title: 'Marketing & Publicité',
          description: 'Stratégies marketing digitales innovantes et campagnes publicitaires percutantes pour construire votre marque et atteindre vos objectifs.',
          icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
          features: [
            'Stratégie marketing digital',
            'Gestion réseaux sociaux',
            'Design campagnes publicitaires',
            'Développement identité marque'
          ],
          metrics: [
            { value: '25+', label: 'Campagnes réussies' },
            { value: '100K+', label: 'Personnes touchées' }
          ]
        },
        {
          id: 3,
          title: 'Relations Publiques',
          description: 'Gestion de l\'image corporate et communication efficace avec les audiences et médias pour construire une réputation forte et durable.',
          icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
          features: [
            'Gestion crises & réputation',
            'Relations médias',
            'Organisation événements',
            'Communication corporate'
          ],
          metrics: [
            { value: '30+', label: 'Événements organisés' },
            { value: '95%', label: 'Satisfaction clients' }
          ]
        }
      ]
    };
    return services[currentLang as keyof typeof services];
  }

  getLearnMoreText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'اعرف المزيد',
      en: 'Learn More',
      fr: 'En savoir plus'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getCtaTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'مستعد لبدء مشروعك؟',
      en: 'Ready to start your project?',
      fr: 'Prêt à démarrer votre projet ?'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getCtaDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'دعنا نناقش كيف يمكننا مساعدتك في تحقيق أهدافك الإعلامية والتسويقية.',
      en: 'Let us discuss how we can help you achieve your media and marketing goals.',
      fr: 'Discutons de la façon dont nous pouvons vous aider à atteindre vos objectifs médiatiques et marketing.'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  getCtaButtonText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'تحدث معنا',
      en: 'Talk to Us',
      fr: 'Parlons-en'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getIconClass(serviceId: number): string {
    const classes = {
      1: 'media-icon',
      2: 'marketing-icon',
      3: 'pr-icon'
    };
    return classes[serviceId as keyof typeof classes] || '';
  }

  onServiceClick(serviceId: number) {
    // Handle service click - could open modal, navigate to detail page, etc.
    this.scrollToContact();
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

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  trackByService(index: number, service: any): number {
    return service.id;
  }

  trackByFeature(index: number, feature: string): string {
    return feature;
  }

  trackByMetric(index: number, metric: any): string {
    return metric.label;
  }
}