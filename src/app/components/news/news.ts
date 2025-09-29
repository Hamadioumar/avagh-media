import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  isFeatured?: boolean;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="news" class="news" role="region" [attr.aria-labelledby]="'news-title'">
      <!-- Background Elements -->
      <div class="news-background" aria-hidden="true">
        <div class="gradient-mesh"></div>
        <div class="floating-elements">
          <div class="floating-element" *ngFor="let element of floatingElements; trackBy: trackByElement"></div>
        </div>
      </div>
      
      <div class="container">
        <header class="section-header" [attr.data-aos]="'fade-up'">
          <h2 id="news-title" class="section-title">{{ getSectionTitle() }}</h2>
          <p class="section-subtitle">{{ getSectionSubtitle() }}</p>
        </header>
        
        <div class="news-grid" role="list">
          <!-- Featured News -->
          <article 
            class="news-card featured" 
            *ngFor="let newsItem of getFeaturedNews(); trackBy: trackByNews"
            [attr.data-aos]="'fade-right'"
            role="listitem">
            
            <div class="news-image">
              <img 
                [src]="newsItem.image" 
                [alt]="newsItem.title"
                loading="lazy"
              />
              <div class="news-category">{{ newsItem.category }}</div>
            </div>
            
            <div class="news-content">
              <div class="news-meta">
                <span class="news-date">{{ newsItem.date }}</span>
                <span class="news-author">{{ newsItem.author }}</span>
              </div>
              
              <h3 class="news-title">{{ newsItem.title }}</h3>
              <p class="news-excerpt">{{ newsItem.excerpt }}</p>
              
              <button 
                class="read-more-btn"
                type="button"
                (click)="openNewsDetail(newsItem)"
                [attr.aria-label]="getReadMoreLabel() + ' ' + newsItem.title">
                <span>{{ getReadMoreText() }}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </button>
            </div>
          </article>
          
          <!-- News Sidebar -->
          <div class="news-sidebar" [attr.data-aos]="'fade-left'" [attr.data-aos-delay]="'200'">
            <article 
              class="news-card compact" 
              *ngFor="let newsItem of getRecentNews(); trackBy: trackByNews"
              role="listitem"
              (click)="openNewsDetail(newsItem)"
              tabindex="0"
              (keydown.enter)="openNewsDetail(newsItem)"
              (keydown.space)="openNewsDetail(newsItem)">
              
              <div class="news-image-small">
                <img 
                  [src]="newsItem.image" 
                  [alt]="newsItem.title"
                  loading="lazy"
                />
              </div>
              
              <div class="news-content-small">
                <div class="news-category small">{{ newsItem.category }}</div>
                <h4 class="news-title-small">{{ newsItem.title }}</h4>
                <div class="news-date-small">{{ newsItem.date }}</div>
              </div>
            </article>
          </div>
        </div>
        
        <!-- News CTA -->
        <div class="news-cta" [attr.data-aos]="'fade-up'" [attr.data-aos-delay]="'400'">
          <h3 class="cta-title">{{ getCtaTitle() }}</h3>
          <p class="cta-description">{{ getCtaDescription() }}</p>
          <button 
            class="cta-button"
            type="button"
            (click)="loadMoreNews()"
            [attr.aria-label]="getCtaButtonLabel()">
            <span>{{ getCtaButtonText() }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./news.scss']
})
export class NewsComponent implements OnInit {
  floatingElements = Array(6).fill(0).map((_, i) => ({ id: i }));

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Initialize component
  }

  getSectionTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'الأخبار والبيانات',
      en: 'News & Press',
      fr: 'Actualités & Communiqués'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getSectionSubtitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const subtitles = {
      ar: 'تابع آخر أخبارنا وإنجازاتنا',
      en: 'Stay updated with our latest news and achievements',
      fr: 'Restez informés de nos dernières actualités et réalisations'
    };
    return subtitles[currentLang as keyof typeof subtitles];
  }

  getReadMoreText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'اقرأ المزيد',
      en: 'Read More',
      fr: 'Lire plus'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getReadMoreLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'قراءة الخبر الكامل',
      en: 'Read full article',
      fr: 'Lire l\'article complet'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getCtaTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'ابقَ على اطلاع',
      en: 'Stay Updated',
      fr: 'Restez Informé'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getCtaDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'لا تفوت أي تحديثات أو أخبار جديدة من فريقنا',
      en: 'Don\'t miss any updates or new announcements from our team',
      fr: 'Ne manquez aucune mise à jour ou nouvelle annonce de notre équipe'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  getCtaButtonText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'عرض المزيد',
      en: 'View More',
      fr: 'Voir Plus'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getCtaButtonLabel(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: 'تحميل المزيد من الأخبار',
      en: 'Load more news',
      fr: 'Charger plus d\'actualités'
    };
    return labels[currentLang as keyof typeof labels];
  }

  getLocalizedNews(): NewsItem[] {
    const currentLang = this.languageService.getCurrentLanguage();
    const news = {
      ar: [
        {
          id: 1,
          title: 'إطلاق حملة إعلامية جديدة لشركة تاسياست',
          excerpt: 'تم إطلاق حملة إعلامية شاملة تسلط الضوء على مساهمات الشركة في التنمية المحلية',
          category: 'إعلام',
          date: '15 سبتمبر 2025',
          author: 'فريق AVAGH MEDIA',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
          isFeatured: true
        },
        {
          id: 2,
          title: 'شراكة استراتيجية مع ميناء تانيت',
          excerpt: 'توقيع اتفاقية شراكة لتطوير المحتوى الإعلامي',
          category: 'شراكات',
          date: '10 سبتمبر 2025',
          author: 'إدارة المشاريع',
          image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop'
        },
        {
          id: 3,
          title: 'جائزة أفضل إنتاج إعلامي محلي',
          excerpt: 'فوز الاستوديو بجائزة التميز في الإنتاج',
          category: 'جوائز',
          date: '5 سبتمبر 2025',
          author: 'فريق التحرير',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'
        },
        {
          id: 4,
          title: 'ورشة عمل حول الإعلام الرقمي',
          excerpt: 'تنظيم ورشة عمل متخصصة في تطوير المحتوى الرقمي',
          category: 'فعاليات',
          date: '1 سبتمبر 2025',
          author: 'فريق التدريب',
          image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop'
        },
        {
          id: 5,
          title: 'توسعة الاستوديو التقني',
          excerpt: 'إضافة معدات تقنية جديدة لتحسين جودة الإنتاج',
          category: 'تطوير',
          date: '28 أغسطس 2025',
          author: 'فريق التقنية',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop'
        }
      ],
      en: [
        {
          id: 1,
          title: 'Launch of New Media Campaign for Tasiast Company',
          excerpt: 'A comprehensive media campaign highlighting the company\'s contributions to local development has been launched',
          category: 'Media',
          date: 'September 15, 2025',
          author: 'AVAGH MEDIA Team',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
          isFeatured: true
        },
        {
          id: 2,
          title: 'Strategic Partnership with Tanit Port',
          excerpt: 'Signing partnership agreement for media content development',
          category: 'Partnerships',
          date: 'September 10, 2025',
          author: 'Project Management',
          image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop'
        },
        {
          id: 3,
          title: 'Best Local Media Production Award',
          excerpt: 'Studio wins excellence award in production',
          category: 'Awards',
          date: 'September 5, 2025',
          author: 'Editorial Team',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'
        },
        {
          id: 4,
          title: 'Digital Media Workshop',
          excerpt: 'Organizing specialized workshop in digital content development',
          category: 'Events',
          date: 'September 1, 2025',
          author: 'Training Team',
          image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop'
        },
        {
          id: 5,
          title: 'Technical Studio Expansion',
          excerpt: 'Adding new technical equipment to improve production quality',
          category: 'Development',
          date: 'August 28, 2025',
          author: 'Technical Team',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop'
        }
      ],
      fr: [
        {
          id: 1,
          title: 'Lancement d\'une nouvelle campagne médiatique pour Tasiast',
          excerpt: 'Une campagne médiatique complète mettant en lumière les contributions de l\'entreprise au développement local a été lancée',
          category: 'Médias',
          date: '15 septembre 2025',
          author: 'Équipe AVAGH MEDIA',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
          isFeatured: true
        },
        {
          id: 2,
          title: 'Partenariat stratégique avec le Port de Tanit',
          excerpt: 'Signature d\'un accord de partenariat pour le développement de contenu médiatique',
          category: 'Partenariats',
          date: '10 septembre 2025',
          author: 'Gestion de projet',
          image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop'
        },
        {
          id: 3,
          title: 'Prix de la meilleure production médiatique locale',
          excerpt: 'Le studio remporte le prix d\'excellence en production',
          category: 'Récompenses',
          date: '5 septembre 2025',
          author: 'Équipe éditoriale',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'
        },
        {
          id: 4,
          title: 'Atelier sur les médias numériques',
          excerpt: 'Organisation d\'un atelier spécialisé dans le développement de contenu numérique',
          category: 'Événements',
          date: '1 septembre 2025',
          author: 'Équipe de formation',
          image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop'
        },
        {
          id: 5,
          title: 'Expansion du studio technique',
          excerpt: 'Ajout de nouveaux équipements techniques pour améliorer la qualité de production',
          category: 'Développement',
          date: '28 août 2025',
          author: 'Équipe technique',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop'
        }
      ]
    };
    return news[currentLang as keyof typeof news];
  }

  getFeaturedNews(): NewsItem[] {
    return this.getLocalizedNews().filter(item => item.isFeatured);
  }

  getRecentNews(): NewsItem[] {
    return this.getLocalizedNews().filter(item => !item.isFeatured);
  }

  openNewsDetail(newsItem: NewsItem) {
    // In a real implementation, this would open a modal or navigate to news detail page
    console.log('Opening news detail:', newsItem.title);
    // You could implement modal logic here or navigate to detail page
  }

  loadMoreNews() {
    // In a real implementation, this would load more news items
    console.log('Loading more news...');
    // You could implement pagination or infinite scroll here
  }

  trackByElement(index: number, element: any): number {
    return element.id;
  }

  trackByNews(index: number, newsItem: NewsItem): number {
    return newsItem.id;
  }
}