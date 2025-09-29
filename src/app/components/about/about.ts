import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface CompanyStat {
  number: string;
  label: string;
  icon: string;
  description?: string;
}

interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about" [attr.aria-labelledby]="'about-title'">
      <div class="container">
        
        <!-- Main About Content -->
        <div class="about-content">
          <div class="about-text" [attr.data-aos]="'fade-right'">
            <header>
              <h2 id="about-title" class="about-title">{{ translate('about.title') }}</h2>
              <p class="about-description">{{ translate('about.description') }}</p>
            </header>
            
            <!-- Company Stats -->
            <div class="stats-container">
              <div 
                class="stat-item" 
                *ngFor="let stat of getLocalizedStats(); trackBy: trackByStat; index as i"
                [attr.data-aos]="'zoom-in'"
                [attr.data-aos-delay]="i * 150">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" [attr.aria-label]="stat.label">
                    <path [attr.d]="stat.icon"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <div class="stat-number" [attr.aria-label]="stat.number + ' ' + stat.label">
                    {{ stat.number }}
                  </div>
                  <div class="stat-label">{{ stat.label }}</div>
                  <p class="stat-description" *ngIf="stat.description">{{ stat.description }}</p>
                </div>
              </div>
            </div>
            
            <!-- Company Values -->
            <div class="company-values">
              <h3 class="values-title">{{ getValuesTitle() }}</h3>
              <div class="values-grid">
                <div 
                  class="value-item" 
                  *ngFor="let value of getCompanyValues(); trackBy: trackByValue; index as i"
                  [attr.data-aos]="'fade-up'"
                  [attr.data-aos-delay]="i * 200">
                  <div class="value-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" [attr.aria-label]="value.title">
                      <path [attr.d]="value.icon"/>
                    </svg>
                  </div>
                  <div class="value-content">
                    <h4>{{ value.title }}</h4>
                    <p>{{ value.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- About Visual -->
          <div class="about-visual" [attr.data-aos]="'fade-left'" [attr.data-aos-delay]="'300'">
            <div class="visual-container">
              
              <!-- Interactive Video Card -->
              <div class="video-card" (click)="playVideo()" (keydown.enter)="playVideo()" (keydown.space)="playVideo()" 
                   tabindex="0" role="button" [attr.aria-label]="getVideoLabel()">
                <div class="video-background">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop" 
                    alt="AVAGH MEDIA Studio"
                    loading="lazy"
                  />
                  <div class="video-overlay"></div>
                </div>
                
                <div class="video-content">
                  <div class="play-button" [attr.aria-label]="getPlayButtonLabel()">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  
                  <div class="video-info">
                    <h4>{{ getVideoTitle() }}</h4>
                    <p>{{ getVideoSubtitle() }}</p>
                    <div class="video-duration">{{ getVideoDuration() }}</div>
                  </div>
                </div>
                
                <div class="video-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{{ getBadgeText() }}</span>
                </div>
              </div>
              
              <!-- Floating Elements -->
              <div class="floating-elements" aria-hidden="true">
                <div class="floating-element element-1">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="floating-element element-2">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                  </svg>
                </div>
                <div class="floating-element element-3">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mission & Vision -->
        <div class="mission-vision" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'600'">
          <div class="mission-vision-grid">
            <div class="mission-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3>{{ getMissionTitle() }}</h3>
              <p>{{ getMissionDescription() }}</p>
            </div>
            
            <div class="vision-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h3>{{ getVisionTitle() }}</h3>
              <p>{{ getVisionDescription() }}</p>
            </div>
          </div>
        </div>
        
        <!-- Call to Action -->
        <div class="about-cta" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'800'">
          <h3>{{ getCtaTitle() }}</h3>
          <p>{{ getCtaDescription() }}</p>
          <div class="cta-buttons">
            <button 
              class="cta-btn primary"
              type="button"
              (click)="scrollToContact()"
              [attr.aria-label]="getPrimaryCtaLabel()">
              <span>{{ getPrimaryCtaText() }}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
            
            <button 
              class="cta-btn secondary"
              type="button"
              (click)="scrollToServices()"
              [attr.aria-label]="getSecondaryCtaLabel()">
              <span>{{ getSecondaryCtaText() }}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about.scss']
})
export class AboutComponent implements OnInit {
  
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Initialize component
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  getLocalizedStats(): CompanyStat[] {
    const currentLang = this.languageService.getCurrentLanguage();
    const stats = {
      ar: [
        { 
          number: '50+', 
          label: 'مشروع منجز',
          description: 'مشاريع متنوعة في الإعلام والتسويق',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        { 
          number: '25+', 
          label: 'عميل راض',
          description: 'شركات وفقًا لنا ثقتها',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        },
        { 
          number: '5+', 
          label: 'سنوات خبرة',
          description: 'خبرة متراكمة في السوق المحلي',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        }
      ],
      en: [
        { 
          number: '50+', 
          label: 'Projects Completed',
          description: 'Diverse projects in media and marketing',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        { 
          number: '25+', 
          label: 'Satisfied Clients',
          description: 'Companies that trusted us',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        },
        { 
          number: '5+', 
          label: 'Years Experience',
          description: 'Accumulated experience in local market',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        }
      ],
      fr: [
        { 
          number: '50+', 
          label: 'Projets Réalisés',
          description: 'Projets diversifiés en médias et marketing',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        { 
          number: '25+', 
          label: 'Clients Satisfaits',
          description: 'Entreprises qui nous ont fait confiance',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        },
        { 
          number: '5+', 
          label: 'Années d\'Expérience',
          description: 'Expérience accumulée sur le marché local',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        }
      ]
    };
    return stats[currentLang as keyof typeof stats];
  }

  getCompanyValues(): CompanyValue[] {
    const currentLang = this.languageService.getCurrentLanguage();
    const values = {
      ar: [
        {
          title: 'الإبداع',
          description: 'نؤمن بقوة الأفكار المبتكرة في صنع الفارق',
          icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        },
        {
          title: 'الجودة',
          description: 'التميز في كل تفصيل هو أساس عملنا',
          icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        },
        {
          title: 'الشراكة',
          description: 'نبني علاقات طويلة المدى مع عملائنا',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        }
      ],
      en: [
        {
          title: 'Creativity',
          description: 'We believe in the power of innovative ideas to make a difference',
          icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        },
        {
          title: 'Quality',
          description: 'Excellence in every detail is the foundation of our work',
          icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        },
        {
          title: 'Partnership',
          description: 'We build long-term relationships with our clients',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        }
      ],
      fr: [
        {
          title: 'Créativité',
          description: 'Nous croyons au pouvoir des idées innovantes pour faire la différence',
          icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        },
        {
          title: 'Qualité',
          description: 'L\'excellence dans chaque détail est la base de notre travail',
          icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        },
        {
          title: 'Partenariat',
          description: 'Nous construisons des relations à long terme avec nos clients',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        }
      ]
    };
    return values[currentLang as keyof typeof values];
  }

  // Video-related methods
  getVideoTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'اكتشف الاستوديو',
      en: 'Discover Our Studio',
      fr: 'Découvrez Notre Studio'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getVideoSubtitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const subtitles = {
      ar: 'جولة داخل منشآتنا الإنتاجية',
      en: 'Tour inside our production facilities',
      fr: 'Visite de nos installations de production'
    };
    return subtitles[currentLang as keyof typeof subtitles];
  }

  getVideoDuration(): string {
    return '2:30';
  }

  getBadgeText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'حصري',
      en: 'Exclusive',
      fr: 'Exclusif'
    };
    return texts[currentLang as keyof typeof texts];
  }

  // Mission & Vision
  getMissionTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'مهمتنا',
      en: 'Our Mission',
      fr: 'Notre Mission'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getMissionDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'تمكين الشركات والمؤسسات من التواصل الفعال مع جمهورها من خلال حلول إعلامية وتسويقية مبتكرة تعكس هويتها وتحقق أهدافها.',
      en: 'Empowering companies and institutions to communicate effectively with their audience through innovative media and marketing solutions that reflect their identity and achieve their goals.',
      fr: 'Permettre aux entreprises et institutions de communiquer efficacement avec leur public grâce à des solutions médiatiques et marketing innovantes qui reflètent leur identité et atteignent leurs objectifs.'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  getVisionTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'رؤيتنا',
      en: 'Our Vision',
      fr: 'Notre Vision'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getVisionDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'أن نكون الشريك الأول والموثوق في المجال الإعلامي والتسويقي في موريتانيا والمنطقة، معروفين بإبداعنا وجودتنا والتزامنا بنجاح عملائنا.',
      en: 'To be the first and trusted partner in the media and marketing field in Mauritania and the region, known for our creativity, quality, and commitment to our clients\' success.',
      fr: 'Être le partenaire de premier plan et de confiance dans le domaine des médias et du marketing en Mauritanie et dans la région, reconnus pour notre créativité, notre qualité et notre engagement envers le succès de nos clients.'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  // CTA methods
  getCtaTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'مستعد للبدء؟',
      en: 'Ready to Get Started?',
      fr: 'Prêt à Commencer ?'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getCtaDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'دعنا نتعاون لتحويل أفكارك إلى مشاريع ناجحة تحقق أهدافك وتترك أثرًا إيجابيًا.',
      en: 'Let\'s collaborate to transform your ideas into successful projects that achieve your goals and leave a positive impact.',
      fr: 'Collaborons pour transformer vos idées en projets réussis qui atteignent vos objectifs et laissent un impact positif.'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  getPrimaryCtaText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'تحدث معنا',
      en: 'Talk to Us',
      fr: 'Parlons-en'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getSecondaryCtaText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'استكشف خدماتنا',
      en: 'Explore Services',
      fr: 'Explorer nos Services'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getValuesTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'قيمنا',
      en: 'Our Values',
      fr: 'Nos Valeurs'
    };
    return titles[currentLang as keyof typeof titles];
  }

  // Accessibility labels
  getVideoLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'تشغيل فيديو جولة في الاستوديو',
      en: 'Play studio tour video',
      fr: 'Lire la vidéo de visite du studio'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getPlayButtonLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'تشغيل الفيديو',
      en: 'Play video',
      fr: 'Lire la vidéo'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getPrimaryCtaLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'الانتقال إلى صفحة التواصل',
      en: 'Go to contact page',
      fr: 'Aller à la page de contact'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getSecondaryCtaLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'الانتقال إلى صفحة الخدمات',
      en: 'Go to services page',
      fr: 'Aller à la page des services'
    };
    return labels[currentLang as keyof typeof labels];
  }

  // Action methods
  playVideo(): void {
    // In a real implementation, this would open a video modal or player
    console.log('Playing studio tour video');
    // You could implement modal logic here or redirect to video page
  }

  scrollToContact(): void {
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

  scrollToServices(): void {
    const element = document.getElementById('services');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  // Tracking functions
  trackByStat(index: number, stat: CompanyStat): string {
    return stat.label;
  }

  trackByValue(index: number, value: CompanyValue): string {
    return value.title;
  }
}