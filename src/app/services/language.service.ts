import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TranslationData {
  [key: string]: {
    ar: string;
    en: string;
    fr: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('ar');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: TranslationData = {
    // Navigation
    'nav.about': {
      ar: 'من نحن؟',
      en: 'About Us',
      fr: 'Qui sommes-nous ?'
    },
    'nav.services': {
      ar: 'خدماتنا',
      en: 'Our Services',
      fr: 'Services'
    },
    'nav.news': {
      ar: 'الأخبار والبيانات',
      en: 'News & Press',
      fr: 'Actualités & Communiqués'
    },
    'nav.partners': {
      ar: 'شركاؤنا',
      en: 'Our Partners',
      fr: 'Partenaires'
    },
    'nav.voices': {
      ar: 'أصداء',
      en: 'Voices',
      fr: 'Échos'
    },
    'nav.contact': {
      ar: 'تواصل معنا',
      en: 'Get in Touch',
      fr: 'Contactez-nous'
    },
    'nav.team': {
      ar: 'الفريق',
      en: 'Team',
      fr: 'L\'équipe'
    },

    // Hero Section
    'hero.title': {
      ar: 'اكتشف كل ما يمكن أن تقدمه AVAGH MEDIA لك',
      en: 'Discover everything AVAGH MEDIA can do for you',
      fr: 'Découvrez tout ce que AVAGH MEDIA peut faire pour vous'
    },
    'hero.subtitle': {
      ar: 'AVAGH MEDIA هي عائلة كبيرة من المواهب. تنوع في المهارات في مجالات مختلفة، متحدة في السعي نحو التميز والجودة.',
      en: 'AVAGH MEDIA is a large family of talents. A diversity of skills in various fields, united by the same quest for excellence and quality.',
      fr: 'AVAGH MEDIA, c\'est avant tout une grande famille de talents. Une diversité de compétences dans des domaines variés, unies par la même quête d\'excellence et de qualité.'
    },
    'hero.cta.primary': {
      ar: 'اكتشف خدماتنا',
      en: 'Discover our services',
      fr: 'Découvrir nos services'
    },
    'hero.cta.secondary': {
      ar: 'تواصل معنا',
      en: 'Contact us',
      fr: 'Nous contacter'
    },

    // About Section
    'about.title': {
      ar: 'رؤيتنا',
      en: 'Our Vision',
      fr: 'Notre Vision'
    },
    'about.description': {
      ar: 'في AVAGH MEDIA، نؤمن بقوة الإبداع في تحويل الأفكار إلى تجارب لا تُنسى. فريقنا متعدد التخصصات يجمع بين الشغف والخبرة التقنية والرؤية الفنية لإحياء مشاريعكم.',
      en: 'At AVAGH MEDIA, we believe in the power of creativity to transform ideas into unforgettable experiences. Our multidisciplinary team combines passion, technical expertise and artistic vision to bring your projects to life.',
      fr: 'Chez AVAGH MEDIA, nous croyons en la puissance de la créativité pour transformer les idées en expériences mémorables. Notre équipe multidisciplinaire combine passion, expertise technique et vision artistique pour donner vie à vos projets.'
    },

    // Services
    'services.title': {
      ar: 'خدماتنا',
      en: 'Our Services',
      fr: 'Nos Services'
    },
    'services.subtitle': {
      ar: 'مجموعة شاملة من الحلول الإبداعية لتلبية جميع احتياجاتكم',
      en: 'A comprehensive range of creative solutions to meet all your needs',
      fr: 'Une gamme complète de solutions créatives pour répondre à tous vos besoins'
    },
    'services.media.title': {
      ar: 'الإعلام',
      en: 'Media',
      fr: 'Médias'
    },
    'services.media.desc': {
      ar: 'إنتاج المحتوى الإعلامي المهني، الوثائقيات، والأفلام الترويجية',
      en: 'Professional media content production, documentaries, and promotional films',
      fr: 'Production de contenu médiatique professionnel, documentaires et films promotionnels'
    },
    'services.advertising.title': {
      ar: 'الإعلان',
      en: 'Advertising',
      fr: 'Publicité'
    },
    'services.advertising.desc': {
      ar: 'استراتيجيات إعلانية رقمية وحملات تسويقية مؤثرة',
      en: 'Digital advertising strategies and impactful marketing campaigns',
      fr: 'Stratégies publicitaires digitales et campagnes marketing percutantes'
    },
    'services.pr.title': {
      ar: 'العلاقات العامة',
      en: 'Public Relations',
      fr: 'Relations Publiques'
    },
    'services.pr.desc': {
      ar: 'إدارة الصورة العامة والتواصل مع الجمهور والإعلام',
      en: 'Public image management and communication with audiences and media',
      fr: 'Gestion de l\'image publique et communication avec les audiences et les médias'
    }
  };

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: string): void {
    this.currentLanguageSubject.next(language);
  }

  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) return key;
    
    const currentLang = this.getCurrentLanguage();
    return translation[currentLang as keyof typeof translation] || key;
  }

  getTranslations(): TranslationData {
    return this.translations;
  }
}
