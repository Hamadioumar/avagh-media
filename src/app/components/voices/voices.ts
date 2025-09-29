import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  project?: string;
  featured?: boolean;
}

@Component({
  selector: 'app-voices',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="voices" class="voices" [attr.aria-labelledby]="'voices-title'">
      <div class="container">
        <header class="section-header" [attr.data-aos]="'fade-up'">
          <h2 id="voices-title" class="section-title">{{ getSectionTitle() }}</h2>
          <p class="section-subtitle">{{ getSectionSubtitle() }}</p>
        </header>
        
        <!-- Testimonials Grid -->
        <div class="testimonials-grid" role="list">
          <article 
            class="testimonial-card" 
            [class.featured]="voice.featured"
            *ngFor="let voice of getLocalizedVoices(); trackBy: trackByVoice; index as i"
            [attr.data-aos]="'fade-up'"
            [attr.data-aos-delay]="i * 150"
            role="listitem">
            
            <div class="card-background" aria-hidden="true"></div>
            
            <header class="testimonial-header">
              <div class="quote-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              <div class="rating" [attr.aria-label]="getRatingLabel(voice.rating)">
                <span 
                  class="star" 
                  *ngFor="let star of getStars(voice.rating); index as starIndex"
                  [attr.aria-hidden]="true"
                  [style.animation-delay.ms]="starIndex * 100">
                  ★
                </span>
              </div>
            </header>
            
            <div class="testimonial-content">
              <blockquote class="testimonial-text">
                "{{ voice.text }}"
              </blockquote>
              
              <div class="project-info" *ngIf="voice.project">
                <span class="project-label">{{ getProjectLabel() }}:</span>
                <span class="project-name">{{ voice.project }}</span>
              </div>
            </div>
            
            <footer class="testimonial-footer">
              <div class="author-avatar">
                <img 
                  [src]="voice.avatar" 
                  [alt]="voice.author"
                  loading="lazy"
                />
                <div class="avatar-ring" aria-hidden="true"></div>
              </div>
              
              <div class="author-details">
                <h3 class="author-name">{{ voice.author }}</h3>
                <p class="author-position">{{ voice.position }}</p>
                <p class="author-company">{{ voice.company }}</p>
              </div>
              
              <div class="testimonial-badge" *ngIf="voice.featured" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </footer>
          </article>
        </div>
        
        <!-- Statistics Section -->
        <div class="client-stats" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'600'">
          <h3 class="stats-title">{{ getStatsTitle() }}</h3>
          <div class="stats-grid">
            <div 
              class="stat-item" 
              *ngFor="let stat of getClientStats(); trackBy: trackByStat; index as i"
              [attr.data-aos]="'zoom-in'"
              [attr.data-aos-delay]="(i + 1) * 100">
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path [attr.d]="stat.icon"/>
                </svg>
              </div>
              <div class="stat-number" [attr.aria-label]="stat.number + ' ' + stat.label">
                {{ stat.number }}
              </div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        
        <!-- Call to Action -->
        <div class="voices-cta" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'800'">
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
  styleUrls: ['./voices.scss']
})
export class VoicesComponent implements OnInit {
  
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Initialize component
  }

  getSectionTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'أصداء عملائنا',
      en: 'Client Voices',
      fr: 'Témoignages clients'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getSectionSubtitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const subtitles = {
      ar: 'اكتشف ما يقوله شركاؤنا عن تجربتهم معنا ونتائج مشاريعهم',
      en: 'Discover what our partners say about their experience with us and their project results',
      fr: 'Découvrez ce que nos partenaires disent de leur expérience avec nous et des résultats de leurs projets'
    };
    return subtitles[currentLang as keyof typeof subtitles];
  }

  getLocalizedVoices(): Testimonial[] {
    const currentLang = this.languageService.getCurrentLanguage();
    const voices = {
      ar: [
        {
          id: 1,
          text: 'العمل مع AVAGH MEDIA كان تجربة مذهلة لميناء تانيت. فريقهم المتخصص في التواصل والتسويق والإنتاج السمعي البصري فهم احتياجاتنا بدقة وقدم لنا حلولاً إبداعية ومؤثرة تجاوزت توقعاتنا.',
          author: 'أحمد بن سالم',
          position: 'مدير التسويق والاتصال',
          company: 'ميناء تانيت',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'حملة التسويق الرقمي 2025',
          featured: true
        },
        {
          id: 2,
          text: 'AVAGH MEDIA فريق من الشباب المحترفين المتحمسين الذين يجلبون الإبداع والالتزام لكل مشروع يعملون عليه. كل فيديو ووثائقي ينتجونه معنا مشبع برؤيتهم الفريدة والجودة العالية.',
          author: 'فاطمة الرشيد',
          position: 'مسؤولة التواصل المؤسسي',
          company: 'شركة تاسياست',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9fc1900?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'سلسلة الوثائقيات المؤسسية'
        },
        {
          id: 3,
          text: 'وكالة AVAGH MEDIA تميزت بأدائها المهني عالي المستوى وقدرتها على التكيف مع متطلباتنا المتغيرة. منظمة إعلامية منضبطة ومسؤولة أظهرت التزاماً كبيراً في تنفيذ مشاريعنا.',
          author: 'عمر صيدبي',
          position: 'مستشار إعلامي أول',
          company: 'شركة معادن',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'استراتيجية العلاقات العامة'
        },
        {
          id: 4,
          text: 'التعاون مع AVAGH MEDIA في إنتاج محتوانا التعليمي كان قرارًا موفقًا. فهموا رسالتنا التعليمية وترجموها إلى محتوى بصري جذاب وفعال يلامس قلوب المشاهدين.',
          author: 'مريم الأمين',
          position: 'مديرة المحتوى',
          company: 'edUKate موريتانيا',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'منصة التعلم الرقمي'
        }
      ],
      en: [
        {
          id: 1,
          text: 'Working with AVAGH MEDIA has been an incredible experience for Tanit Port. Their specialized team in communication, marketing, and audiovisual production understood our needs precisely and delivered creative, impactful solutions that exceeded our expectations.',
          author: 'Ahmed Ben Salem',
          position: 'Marketing & Communications Director',
          company: 'Tanit Port',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'Digital Marketing Campaign 2025',
          featured: true
        },
        {
          id: 2,
          text: 'AVAGH MEDIA is a team of passionate young professionals who bring creativity and commitment to every project they work on. Every video and documentary they produce with us is infused with their unique vision and high quality.',
          author: 'Fatima Al-Rashid',
          position: 'Corporate Communications Manager',
          company: 'Tasiast Company',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9fc1900?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'Corporate Documentary Series'
        },
        {
          id: 3,
          text: 'AVAGH MEDIA agency distinguished itself with high-level professional performance and ability to adapt to our changing requirements. A disciplined and responsible media organization that showed great commitment in executing our projects.',
          author: 'Omar Sidibe',
          position: 'Senior Media Advisor',
          company: 'MAADEN Company',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'Public Relations Strategy'
        },
        {
          id: 4,
          text: 'Collaborating with AVAGH MEDIA on producing our educational content was a wise decision. They understood our educational mission and translated it into engaging and effective visual content that touches viewers\' hearts.',
          author: 'Maryam Al-Amin',
          position: 'Content Director',
          company: 'edUKate Mauritania',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'Digital Learning Platform'
        }
      ],
      fr: [
        {
          id: 1,
          text: 'Travailler avec AVAGH MEDIA a été une expérience incroyable pour le Port de Tanit. Leur équipe spécialisée en communication, marketing et production audiovisuelle a compris nos besoins avec précision et a livré des solutions créatives et percutantes qui ont dépassé nos attentes.',
          author: 'Ahmed Ben Salem',
          position: 'Directeur Marketing et Communication',
          company: 'Port de Tanit',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'Campagne Marketing Digital 2025',
          featured: true
        },
        {
          id: 2,
          text: 'AVAGH MEDIA est une équipe de jeunes professionnels passionnés qui apportent créativité et engagement à chaque projet sur lequel ils travaillent. Chaque vidéo et documentaire qu\'ils produisent avec nous est imprégné de leur vision unique et de leur haute qualité.',
          author: 'Fatima Al-Rashid',
          position: 'Responsable Communication Corporate',
          company: 'Société Tasiast',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9fc1900?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'Série Documentaire Corporate'
        },
        {
          id: 3,
          text: 'L\'agence AVAGH MEDIA s\'est distinguée par ses performances professionnelles de haut niveau et sa capacité à s\'adapter à nos exigences changeantes. Une organisation médiatique disciplinée et responsable qui a fait preuve d\'un grand engagement dans l\'exécution de nos projets.',
          author: 'Omar Sidibe',
          position: 'Conseiller Média Senior',
          company: 'Société MAADEN',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'Stratégie Relations Publiques'
        },
        {
          id: 4,
          text: 'Collaborer avec AVAGH MEDIA sur la production de notre contenu éducatif était une sage décision. Ils ont compris notre mission éducative et l\'ont traduite en contenu visuel engageant et efficace qui touche le cœur des spectateurs.',
          author: 'Maryam Al-Amin',
          position: 'Directrice du Contenu',
          company: 'edUKate Mauritanie',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          rating: 5,
          project: 'Plateforme d\'Apprentissage Digital'
        }
      ]
    };
    return voices[currentLang as keyof typeof voices];
  }

  getClientStats() {
    const currentLang = this.languageService.getCurrentLanguage();
    const stats = {
      ar: [
        {
          number: '98%',
          label: 'رضا العملاء',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          number: '95%',
          label: 'مشاريع في الوقت المحدد',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          number: '85%',
          label: 'عملاء متكررون',
          icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
        },
        {
          number: '24/7',
          label: 'دعم العملاء',
          icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
        }
      ],
      en: [
        {
          number: '98%',
          label: 'Client Satisfaction',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          number: '95%',
          label: 'On-Time Projects',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          number: '85%',
          label: 'Repeat Clients',
          icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
        },
        {
          number: '24/7',
          label: 'Client Support',
          icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
        }
      ],
      fr: [
        {
          number: '98%',
          label: 'Satisfaction Client',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          number: '95%',
          label: 'Projets À Temps',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          number: '85%',
          label: 'Clients Récurrents',
          icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
        },
        {
          number: '24/7',
          label: 'Support Client',
          icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
        }
      ]
    };
    return stats[currentLang as keyof typeof stats];
  }

  getStatsTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'أرقامنا تتحدث',
      en: 'Our Numbers Speak',
      fr: 'Nos Chiffres Parlent'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getCtaTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'جاهز لتكون التالي؟',
      en: 'Ready to Be Next?',
      fr: 'Prêt à être le prochain ?'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getCtaDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'انضم إلى قائمة عملائنا الراضين واكتشف كيف يمكننا تحويل رؤيتك إلى نجاح حقيقي',
      en: 'Join our list of satisfied clients and discover how we can transform your vision into real success',
      fr: 'Rejoignez notre liste de clients satisfaits et découvrez comment nous pouvons transformer votre vision en véritable succès'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  getCtaButtonText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'ابدأ مشروعك',
      en: 'Start Your Project',
      fr: 'Démarrez Votre Projet'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getProjectLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'المشروع',
      en: 'Project',
      fr: 'Projet'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getRatingLabel(rating: number): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: `تقييم ${rating} من 5 نجوم`,
      en: `${rating} out of 5 stars rating`,
      fr: `Note de ${rating} sur 5 étoiles`
    };
    return labels[currentLang as keyof typeof labels];
  }

  getCtaButtonLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'ابدأ مشروعك مع AVAGH MEDIA',
      en: 'Start your project with AVAGH MEDIA',
      fr: 'Démarrez votre projet avec AVAGH MEDIA'
    };
    return labels[currentLang as keyof typeof labels];
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

  getStars(rating: number): number[] {
    return Array(rating).fill(0).map((_, i) => i);
  }

  trackByVoice(index: number, voice: Testimonial): number {
    return voice.id;
  }

  trackByStat(index: number, stat: any): string {
    return stat.label;
  }
}