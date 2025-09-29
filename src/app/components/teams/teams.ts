import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  experience: string;
  bio: string;
  image: string;
  specialties: string[];
  skills: string[];
  achievements: string[];
  isFeatured: boolean;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="teams" class="teams" role="region" [attr.aria-labelledby]="'teams-title'">
      <!-- Background Elements -->
      <div class="teams-background" aria-hidden="true">
        <div class="gradient-mesh"></div>
        <div class="floating-elements">
          <div class="floating-element" *ngFor="let element of floatingElements; trackBy: trackByElement"></div>
        </div>
      </div>
      
      <div class="container">
        <header class="section-header" [attr.data-aos]="'fade-up'">
          <h2 id="teams-title" class="section-title">{{ translate('teams.title') }}</h2>
          <p class="section-subtitle">{{ translate('teams.subtitle') }}</p>
        </header>
        
        <!-- Team Grid -->
        <div class="team-grid" role="list">
          <article 
            class="team-member" 
            [class.featured]="member.isFeatured"
            *ngFor="let member of getLocalizedTeamMembers(); trackBy: trackByMember; index as i"
            [attr.data-aos]="'fade-up'"
            [attr.data-aos-delay]="i * 200"
            role="listitem">
            
            <div class="member-card">
              <!-- Image Section -->
              <div class="member-image-container">
                <div class="member-image">
                  <img 
                    [src]="member.image" 
                    [alt]="getMemberAltText(member)"
                    loading="lazy"
                  />
                  <div class="image-overlay">
                    <div class="social-links">
                      <a 
                        *ngIf="member.socialLinks?.linkedin"
                        class="social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        [attr.aria-label]="getSocialLinkLabel('linkedin', member.name)">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a 
                        *ngIf="member.socialLinks?.twitter"
                        class="social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        [attr.aria-label]="getSocialLinkLabel('twitter', member.name)">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <!-- Featured Badge -->
                <div class="member-badge" *ngIf="member.isFeatured" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              
              <!-- Content Section -->
              <div class="member-content">
                <header class="member-header">
                  <h3 class="member-name">{{ member.name }}</h3>
                  <p class="member-position">{{ member.position }}</p>
                  <p class="member-experience">{{ member.experience }}</p>
                </header>
                
                <div class="member-bio">
                  <p>{{ member.bio }}</p>
                </div>
                
                <!-- Specialties -->
                <div class="member-specialties" *ngIf="member.specialties.length">
                  <h4 class="specialties-title">{{ getSpecialtiesTitle() }}</h4>
                  <ul class="specialties-list" role="list">
                    <li 
                      class="specialty-item" 
                      *ngFor="let specialty of member.specialties; trackBy: trackBySpecialty"
                      role="listitem">
                      <span class="specialty-check" aria-hidden="true">✓</span>
                      <span>{{ specialty }}</span>
                    </li>
                  </ul>
                </div>
                
                <!-- Skills -->
                <div class="member-skills" *ngIf="member.skills.length">
                  <h4 class="skills-title">{{ getSkillsTitle() }}</h4>
                  <div class="skills-list">
                    <span 
                      class="skill-tag" 
                      *ngFor="let skill of member.skills; trackBy: trackBySkill">
                      {{ skill }}
                    </span>
                  </div>
                </div>
                
                <!-- Achievements -->
                <div class="member-achievements" *ngIf="member.achievements.length">
                  <h4 class="achievements-title">{{ getAchievementsTitle() }}</h4>
                  <ul class="achievements-list" role="list">
                    <li 
                      class="achievement-item" 
                      *ngFor="let achievement of member.achievements; trackBy: trackByAchievement"
                      role="listitem">
                      <span class="achievement-icon" aria-hidden="true">🏆</span>
                      <span>{{ achievement }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
        
        <!-- Join Team CTA -->
        <div class="join-team-cta" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'600'">
          <div class="cta-content">
            <h3 class="cta-title">{{ getCtaTitle() }}</h3>
            <p class="cta-description">{{ getCtaDescription() }}</p>
            
            <!-- Team Stats -->
            <div class="team-stats">
              <div class="stat-item" *ngFor="let stat of getTeamStats(); trackBy: trackByStat">
                <span class="stat-number">{{ stat.number }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            </div>
            
            <!-- CTA Actions -->
            <div class="cta-actions">
              <button 
                class="join-btn primary"
                type="button"
                (click)="scrollToContact()"
                [attr.aria-label]="getJoinButtonLabel()">
                <span>{{ getJoinButtonText() }}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </button>
              
              <button 
                class="learn-more-btn"
                type="button"
                (click)="scrollToAbout()"
                [attr.aria-label]="getLearnMoreLabel()">
                <span>{{ getLearnMoreText() }}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./teams.scss']
})
export class TeamsComponent implements OnInit {
  floatingElements = Array(4).fill(0).map((_, i) => ({ id: i }));
  
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Initialize component
  }

  getLocalizedTeamMembers(): TeamMember[] {
    const currentLang = this.languageService.getCurrentLanguage();
    const members = {
      ar: [
        {
          id: 1,
          name: 'أحمدعمري',
          position: 'مدير الإنتاج',
          experience: '10+ سنوات خبرة',
          bio: 'محترف في الإعلام والإنتاج مع خبرة واسعة في إدارة المشاريع الإبداعية وتطوير المحتوى المؤثر.',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
          specialties: ['إنتاج الفيديو', 'الإخراج', 'إدارة المشاريع'],
          skills: ['Premiere Pro', 'After Effects', 'إدارة الفريق'],
          achievements: ['50+ مشروع منجز', 'جائزة أفضل إنتاج'],
          isFeatured: true,
          socialLinks: {
            linkedin: '#',
            twitter: '#'
          }
        },
        {
          id: 2,
          name: 'فاطمة الزهراء',
          position: 'خبيرة التسويق',
          experience: '8+ سنوات خبرة',
          bio: 'متخصصة في التسويق الرقمي واستراتيجيات العلامات التجارية مع شغف لتحويل الأفكار إلى نتائج ملموسة.',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
          specialties: ['التسويق الرقمي', 'استراتيجية العلامة', 'تحليل البيانات'],
          skills: ['Google Analytics', 'SEO', 'إدارة الحملات'],
          achievements: ['25+ حملة ناجحة', 'زيادة المبيعات 300%'],
          isFeatured: false,
          socialLinks: {
            linkedin: '#',
            twitter: '#'
          }
        },
        {
          id: 3,
          name: 'محمد الشريف',
          position: 'مصمم جرافيك',
          experience: '6+ سنوات خبرة',
          bio: 'مصمم مبدع متخصص في الهوية البصرية وتصميم الواجهات مع عين للتفاصيل وشغف للإبداع.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          specialties: ['التصميم الجرافيكي', 'الهوية البصرية', 'تصميم UI/UX'],
          skills: ['Photoshop', 'Illustrator', 'Figma'],
          achievements: ['100+ تصميم', 'جوائز تصميم متعددة'],
          isFeatured: false,
          socialLinks: {
            linkedin: '#',
            github: '#'
          }
        }
      ],
      en: [
        {
          id: 1,
          name: 'Ahmed Al-Amri',
          position: 'Production Manager',
          experience: '10+ Years Experience',
          bio: 'Media and production professional with extensive experience in managing creative projects and developing impactful content.',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
          specialties: ['Video Production', 'Direction', 'Project Management'],
          skills: ['Premiere Pro', 'After Effects', 'Team Leadership'],
          achievements: ['50+ Projects Completed', 'Best Production Award'],
          isFeatured: true,
          socialLinks: {
            linkedin: '#',
            twitter: '#'
          }
        },
        {
          id: 2,
          name: 'Fatima Al-Zahra',
          position: 'Marketing Expert',
          experience: '8+ Years Experience',
          bio: 'Digital marketing specialist and brand strategist with a passion for turning ideas into tangible results.',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
          specialties: ['Digital Marketing', 'Brand Strategy', 'Data Analysis'],
          skills: ['Google Analytics', 'SEO', 'Campaign Management'],
          achievements: ['25+ Successful Campaigns', '300% Sales Increase'],
          isFeatured: false,
          socialLinks: {
            linkedin: '#',
            twitter: '#'
          }
        },
        {
          id: 3,
          name: 'Mohamed Al-Sharif',
          position: 'Graphic Designer',
          experience: '6+ Years Experience',
          bio: 'Creative designer specializing in visual identity and UI/UX design with an eye for detail and passion for innovation.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          specialties: ['Graphic Design', 'Visual Identity', 'UI/UX Design'],
          skills: ['Photoshop', 'Illustrator', 'Figma'],
          achievements: ['100+ Designs', 'Multiple Design Awards'],
          isFeatured: false,
          socialLinks: {
            linkedin: '#',
            github: '#'
          }
        }
      ],
      fr: [
        {
          id: 1,
          name: 'Ahmed Al-Amri',
          position: 'Directeur de Production',
          experience: '10+ Ans d\'Expérience',
          bio: 'Professionnel des médias et de la production avec une vaste expérience dans la gestion de projets créatifs et le développement de contenu percutant.',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
          specialties: ['Production Vidéo', 'Réalisation', 'Gestion de Projet'],
          skills: ['Premiere Pro', 'After Effects', 'Leadership d\'Équipe'],
          achievements: ['50+ Projets Réalisés', 'Prix Meilleure Production'],
          isFeatured: true,
          socialLinks: {
            linkedin: '#',
            twitter: '#'
          }
        },
        {
          id: 2,
          name: 'Fatima Al-Zahra',
          position: 'Experte en Marketing',
          experience: '8+ Ans d\'Expérience',
          bio: 'Spécialiste du marketing digital et de la stratégie de marque avec une passion pour transformer les idées en résultats tangibles.',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
          specialties: ['Marketing Digital', 'Stratégie de Marque', 'Analyse de Données'],
          skills: ['Google Analytics', 'SEO', 'Gestion de Campagnes'],
          achievements: ['25+ Campagnes Réussies', 'Augmentation des Ventes 300%'],
          isFeatured: false,
          socialLinks: {
            linkedin: '#',
            twitter: '#'
          }
        },
        {
          id: 3,
          name: 'Mohamed Al-Sharif',
          position: 'Designer Graphique',
          experience: '6+ Ans d\'Expérience',
          bio: 'Designer créatif spécialisé dans l\'identité visuelle et le design UI/UX avec un œil pour les détails et une passion pour l\'innovation.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          specialties: ['Design Graphique', 'Identité Visuelle', 'Design UI/UX'],
          skills: ['Photoshop', 'Illustrator', 'Figma'],
          achievements: ['100+ Designs', 'Plusieurs Prix de Design'],
          isFeatured: false,
          socialLinks: {
            linkedin: '#',
            github: '#'
          }
        }
      ]
    };
    return members[currentLang as keyof typeof members];
  }

  getTeamStats() {
    const currentLang = this.languageService.getCurrentLanguage();
    const stats = {
      ar: [
        { number: '15+', label: 'خبير محترف' },
        { number: '50+', label: 'مشروع منجز' },
        { number: '95%', label: 'رضا العملاء' }
      ],
      en: [
        { number: '15+', label: 'Professional Experts' },
        { number: '50+', label: 'Projects Completed' },
        { number: '95%', label: 'Client Satisfaction' }
      ],
      fr: [
        { number: '15+', label: 'Experts Professionnels' },
        { number: '50+', label: 'Projets Réalisés' },
        { number: '95%', label: 'Satisfaction Clients' }
      ]
    };
    return stats[currentLang as keyof typeof stats];
  }

  getSpecialtiesTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'التخصصات',
      en: 'Specialties',
      fr: 'Spécialités'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getSkillsTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'المهارات',
      en: 'Skills',
      fr: 'Compétences'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getAchievementsTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'الإنجازات',
      en: 'Achievements',
      fr: 'Réalisations'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getCtaTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'انضم إلى فريقنا',
      en: 'Join Our Team',
      fr: 'Rejoignez Notre Équipe'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getCtaDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'كن جزءًا من فريقنا المبدع وساهم في صنع محتوى مؤثر يلامس قلوب الجمهور.',
      en: 'Be part of our creative team and contribute to making impactful content that touches audiences.',
      fr: 'Faites partie de notre équipe créative et contribuez à créer un contenu percutant qui touche le public.'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  getJoinButtonText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'انضم إلينا',
      en: 'Join Us',
      fr: 'Nous Rejoindre'
    };
    return texts[currentLang as keyof typeof texts];
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

  getMemberAltText(member: TeamMember): string {
    return `${member.name} - ${member.position}`;
  }

  getSocialLinkLabel(platform: string, name: string): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: `تابع ${name} على ${platform}`,
      en: `Follow ${name} on ${platform}`,
      fr: `Suivez ${name} sur ${platform}`
    };
    return labels[currentLang as keyof typeof labels];
  }

  getJoinButtonLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'الانتقال إلى صفحة التوظيف',
      en: 'Go to careers page',
      fr: 'Aller à la page des carrières'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getLearnMoreLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'معرفة المزيد عن الفريق',
      en: 'Learn more about our team',
      fr: 'En savoir plus sur notre équipe'
    };
    return labels[currentLang as keyof typeof labels];
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

  scrollToAbout() {
    const element = document.getElementById('about');
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

  trackByElement(index: number, element: any): number {
    return element.id;
  }

  trackByMember(index: number, member: TeamMember): number {
    return member.id;
  }

  trackBySpecialty(index: number, specialty: string): string {
    return specialty;
  }

  trackBySkill(index: number, skill: string): string {
    return skill;
  }

  trackByAchievement(index: number, achievement: string): string {
    return achievement;
  }

  trackByStat(index: number, stat: any): string {
    return stat.label;
  }
}