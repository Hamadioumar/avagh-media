import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface ValidationErrors {
  [key: string]: string | null;
}

interface ContactItem {
  title: string;
  value: string;
  icon: string;
}

interface TrustBadge {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact" role="region" [attr.aria-labelledby]="'contact-title'">
      <!-- Background Elements -->
      <div class="contact-background" aria-hidden="true">
        <div class="gradient-mesh"></div>
        <div class="floating-elements">
          <div class="floating-element" *ngFor="let element of floatingElements; trackBy: trackByElement"></div>
        </div>
      </div>
      
      <div class="container">
        <div class="contact-content">
          <!-- Contact Information -->
          <div class="contact-info" [attr.data-aos]="'fade-right'">
            <header>
              <h2 id="contact-title" class="contact-title">{{ getContactTitle() }}</h2>
              <p class="contact-description">{{ getContactDescription() }}</p>
            </header>
            
            <div class="contact-details" role="list">
              <div 
                class="contact-item" 
                *ngFor="let item of getLocalizedContactItems(); trackBy: trackByContact"
                role="listitem">
                <div class="contact-icon" [attr.aria-label]="item.title">
                  <svg viewBox="0 0 24 24" fill="currentColor" [attr.aria-hidden]="true">
                    <path [attr.d]="item.icon"/>
                  </svg>
                </div>
                <div class="contact-text">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.value }}</p>
                </div>
              </div>
            </div>

            <!-- Trust Indicators -->
            <div class="trust-section">
              <h3 class="trust-title">{{ getTrustTitle() }}</h3>
              <div class="trust-badges">
                <div class="trust-badge" *ngFor="let badge of getTrustBadges(); trackBy: trackByTrust">
                  <div class="badge-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path [attr.d]="badge.icon"/>
                    </svg>
                  </div>
                  <span>{{ badge.label }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <form 
            class="contact-form" 
            (ngSubmit)="onSubmit()" 
            #contactForm="ngForm"
            [attr.data-aos]="'fade-left'"
            novalidate>
            
            <div class="form-header">
              <h3>{{ getFormTitle() }}</h3>
              <p>{{ getFormSubtitle() }}</p>
            </div>
            
            <!-- Name Fields -->
            <div class="form-row">
              <div class="form-group">
                <label for="firstName" class="form-label">
                  {{ getFieldLabel('firstName') }}
                  <span class="required" aria-label="required">*</span>
                </label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName"
                  [(ngModel)]="formData.firstName"
                  required
                  #firstName="ngModel"
                  class="form-input"
                  [class.error]="getFieldError('firstName')"
                  [attr.aria-describedby]="getFieldError('firstName') ? 'firstName-error' : null"
                  [attr.aria-invalid]="getFieldError('firstName') ? 'true' : 'false'"
                  (blur)="validateField('firstName')"
                  (input)="clearFieldError('firstName')"
                  autocomplete="given-name"
                />
                <div 
                  id="firstName-error" 
                  class="error-message" 
                  *ngIf="getFieldError('firstName')"
                  role="alert">
                  {{ getFieldError('firstName') }}
                </div>
              </div>
              
              <div class="form-group">
                <label for="lastName" class="form-label">
                  {{ getFieldLabel('lastName') }}
                  <span class="required" aria-label="required">*</span>
                </label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName"
                  [(ngModel)]="formData.lastName"
                  required
                  #lastName="ngModel"
                  class="form-input"
                  [class.error]="getFieldError('lastName')"
                  [attr.aria-describedby]="getFieldError('lastName') ? 'lastName-error' : null"
                  [attr.aria-invalid]="getFieldError('lastName') ? 'true' : 'false'"
                  (blur)="validateField('lastName')"
                  (input)="clearFieldError('lastName')"
                  autocomplete="family-name"
                />
                <div 
                  id="lastName-error" 
                  class="error-message" 
                  *ngIf="getFieldError('lastName')"
                  role="alert">
                  {{ getFieldError('lastName') }}
                </div>
              </div>
            </div>
            
            <!-- Email Field -->
            <div class="form-group">
              <label for="email" class="form-label">
                {{ getFieldLabel('email') }}
                <span class="required" aria-label="required">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email"
                [(ngModel)]="formData.email"
                required
                email
                #email="ngModel"
                class="form-input"
                [class.error]="getFieldError('email')"
                [attr.aria-describedby]="getFieldError('email') ? 'email-error' : null"
                [attr.aria-invalid]="getFieldError('email') ? 'true' : 'false'"
                (blur)="validateField('email')"
                (input)="clearFieldError('email')"
                autocomplete="email"
              />
              <div 
                id="email-error" 
                class="error-message" 
                *ngIf="getFieldError('email')"
                role="alert">
                {{ getFieldError('email') }}
              </div>
            </div>
            
            <!-- Phone Field -->
            <div class="form-group">
              <label for="phone" class="form-label">{{ getFieldLabel('phone') }}</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                [(ngModel)]="formData.phone"
                class="form-input"
                [class.error]="getFieldError('phone')"
                [attr.aria-describedby]="getFieldError('phone') ? 'phone-error' : null"
                [attr.aria-invalid]="getFieldError('phone') ? 'true' : 'false'"
                (blur)="validateField('phone')"
                (input)="clearFieldError('phone')"
                autocomplete="tel"
              />
              <div 
                id="phone-error" 
                class="error-message" 
                *ngIf="getFieldError('phone')"
                role="alert">
                {{ getFieldError('phone') }}
              </div>
            </div>
            
            <!-- Service Field -->
            <div class="form-group">
              <label for="service" class="form-label">{{ getFieldLabel('service') }}</label>
              <select 
                id="service" 
                name="service"
                [(ngModel)]="formData.service"
                class="form-input form-select"
                [class.error]="getFieldError('service')"
                [attr.aria-describedby]="getFieldError('service') ? 'service-error' : null"
                [attr.aria-invalid]="getFieldError('service') ? 'true' : 'false'"
                (blur)="validateField('service')"
                (change)="clearFieldError('service')">
                <option value="">{{ getSelectPlaceholder() }}</option>
                <option *ngFor="let option of getServiceOptions(); trackBy: trackByOption" [value]="option.value">
                  {{ option.label }}
                </option>
              </select>
              <div 
                id="service-error" 
                class="error-message" 
                *ngIf="getFieldError('service')"
                role="alert">
                {{ getFieldError('service') }}
              </div>
            </div>
            
            <!-- Message Field -->
            <div class="form-group">
              <label for="message" class="form-label">
                {{ getFieldLabel('message') }}
                <span class="required" aria-label="required">*</span>
              </label>
              <textarea 
                id="message" 
                name="message"
                [(ngModel)]="formData.message"
                required
                #message="ngModel"
                class="form-input form-textarea"
                [class.error]="getFieldError('message')"
                [attr.aria-describedby]="getFieldError('message') ? 'message-error' : null"
                [attr.aria-invalid]="getFieldError('message') ? 'true' : 'false'"
                rows="5"
                [placeholder]="getMessagePlaceholder()"
                (blur)="validateField('message')"
                (input)="clearFieldError('message')"
                maxlength="1000">
              </textarea>
              <div class="character-count" [class.limit-near]="formData.message.length > 800">
                {{ formData.message.length }}/1000
              </div>
              <div 
                id="message-error" 
                class="error-message" 
                *ngIf="getFieldError('message')"
                role="alert">
                {{ getFieldError('message') }}
              </div>
            </div>
            
            <!-- Submit Button -->
            <button 
              type="submit" 
              class="submit-btn"
              [disabled]="isSubmitting || !isFormValid()"
              [attr.aria-describedby]="'submit-status'">
              <span *ngIf="!isSubmitting" class="btn-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="btn-icon" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                {{ getSubmitText() }}
              </span>
              <span *ngIf="isSubmitting" class="btn-content">
                <div class="loading-spinner" aria-hidden="true"></div>
                {{ getSubmittingText() }}
              </span>
            </button>
            
            <!-- Form Status -->
            <div id="submit-status" class="form-status" role="status" aria-live="polite">
              <div *ngIf="submitMessage" [ngClass]="{'success': submitSuccess, 'error': !submitSuccess}">
                {{ submitMessage }}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./contact.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  formData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };
  
  validationErrors: ValidationErrors = {};
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
  floatingElements = Array(8).fill(0).map((_, i) => ({ id: i }));

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Initialize component
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  getContactTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'لنبني شيئاً رائعاً معاً',
      en: 'Let\'s Build Something Amazing Together',
      fr: 'Construisons quelque chose d\'extraordinaire ensemble'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getContactDescription(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const descriptions = {
      ar: 'مستعد لتحويل رؤيتك إلى واقع؟ تواصل معنا اليوم واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك الإعلامية والتسويقية.',
      en: 'Ready to turn your vision into reality? Get in touch today and discover how we can help you achieve your media and marketing goals.',
      fr: 'Prêt à transformer votre vision en réalité ? Contactez-nous dès aujourd\'hui et découvrez comment nous pouvons vous aider à atteindre vos objectifs médiatiques et marketing.'
    };
    return descriptions[currentLang as keyof typeof descriptions];
  }

  getLocalizedContactItems(): ContactItem[] {
    const currentLang = this.languageService.getCurrentLanguage();
    const items = {
      ar: [
        {
          title: 'الهاتف',
          value: '+222 XX XX XX XX',
          icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
        },
        {
          title: 'البريد الإلكتروني',
          value: 'hello@avaghmedia.mr',
          icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        },
        {
          title: 'العنوان',
          value: 'نواكشوط، موريتانيا',
          icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
        },
        {
          title: 'ساعات العمل',
          value: 'الأحد - الخميس: 8:00 - 18:00',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        }
      ],
      en: [
        {
          title: 'Phone',
          value: '+222 XX XX XX XX',
          icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
        },
        {
          title: 'Email',
          value: 'hello@avaghmedia.mr',
          icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        },
        {
          title: 'Address',
          value: 'Nouakchott, Mauritania',
          icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
        },
        {
          title: 'Business Hours',
          value: 'Sun - Thu: 8:00 AM - 6:00 PM',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        }
      ],
      fr: [
        {
          title: 'Téléphone',
          value: '+222 XX XX XX XX',
          icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
        },
        {
          title: 'Email',
          value: 'hello@avaghmedia.mr',
          icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        },
        {
          title: 'Adresse',
          value: 'Nouakchott, Mauritanie',
          icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
        },
        {
          title: 'Heures d\'ouverture',
          value: 'Dim - Jeu: 8h00 - 18h00',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        }
      ]
    };
    return items[currentLang as keyof typeof items];
  }

  getTrustTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'لماذا تختارنا؟',
      en: 'Why Choose Us?',
      fr: 'Pourquoi nous choisir ?'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getTrustBadges(): TrustBadge[] {
    const currentLang = this.languageService.getCurrentLanguage();
    const badges = {
      ar: [
        {
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
          label: 'جودة مضمونة'
        },
        {
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
          label: 'تسليم في الوقت'
        },
        {
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
          label: 'فريق محترف'
        }
      ],
      en: [
        {
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
          label: 'Quality Guaranteed'
        },
        {
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
          label: 'On-Time Delivery'
        },
        {
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
          label: 'Expert Team'
        }
      ],
      fr: [
        {
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
          label: 'Qualité Garantie'
        },
        {
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
          label: 'Livraison Ponctuelle'
        },
        {
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
          label: 'Équipe Experte'
        }
      ]
    };
    return badges[currentLang as keyof typeof badges];
  }

  getFormTitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const titles = {
      ar: 'أرسل لنا رسالة',
      en: 'Send us a message',
      fr: 'Envoyez-nous un message'
    };
    return titles[currentLang as keyof typeof titles];
  }

  getFormSubtitle(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const subtitles = {
      ar: 'املأ النموذج وسنعود إليك في أقرب وقت ممكن',
      en: 'Fill out the form and we\'ll get back to you as soon as possible',
      fr: 'Remplissez le formulaire et nous vous recontacterons dès que possible'
    };
    return subtitles[currentLang as keyof typeof subtitles];
  }

  getFieldLabel(field: string): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const labels = {
      ar: {
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        service: 'الخدمة المطلوبة',
        message: 'الرسالة'
      },
      en: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        service: 'Service Needed',
        message: 'Your Message'
      },
      fr: {
        firstName: 'Prénom',
        lastName: 'Nom de famille',
        email: 'Adresse email',
        phone: 'Numéro de téléphone',
        service: 'Service souhaité',
        message: 'Votre message'
      }
    };
    return labels[currentLang as keyof typeof labels][field as keyof typeof labels.ar];
  }

  getSelectPlaceholder(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const placeholders = {
      ar: 'اختر خدمة...',
      en: 'Select a service...',
      fr: 'Sélectionnez un service...'
    };
    return placeholders[currentLang as keyof typeof placeholders];
  }

  getServiceOptions() {
    const currentLang = this.languageService.getCurrentLanguage();
    const options = {
      ar: [
        { value: 'media', label: 'الإعلام والإنتاج' },
        { value: 'marketing', label: 'التسويق والإعلان' },
        { value: 'pr', label: 'العلاقات العامة' },
        { value: 'consultation', label: 'استشارة' },
        { value: 'other', label: 'أخرى' }
      ],
      en: [
        { value: 'media', label: 'Media & Production' },
        { value: 'marketing', label: 'Marketing & Advertising' },
        { value: 'pr', label: 'Public Relations' },
        { value: 'consultation', label: 'Consultation' },
        { value: 'other', label: 'Other' }
      ],
      fr: [
        { value: 'media', label: 'Médias & Production' },
        { value: 'marketing', label: 'Marketing & Publicité' },
        { value: 'pr', label: 'Relations Publiques' },
        { value: 'consultation', label: 'Consultation' },
        { value: 'other', label: 'Autre' }
      ]
    };
    return options[currentLang as keyof typeof options];
  }

  getMessagePlaceholder(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const placeholders = {
      ar: 'أخبرنا عن مشروعك ومتطلباتك...',
      en: 'Tell us about your project and requirements...',
      fr: 'Parlez-nous de votre projet et de vos exigences...'
    };
    return placeholders[currentLang as keyof typeof placeholders];
  }

  getSubmitText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'إرسال الرسالة',
      en: 'Send Message',
      fr: 'Envoyer le message'
    };
    return texts[currentLang as keyof typeof texts];
  }

  getSubmittingText(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const texts = {
      ar: 'جاري الإرسال...',
      en: 'Sending...',
      fr: 'Envoi en cours...'
    };
    return texts[currentLang as keyof typeof texts];
  }

  // Form validation methods
  validateField(fieldName: string): void {
    const value = this.formData[fieldName as keyof FormData];
    let error: string | null = null;

    switch (fieldName) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = this.getValidationMessage('required', fieldName);
        } else if (value.trim().length < 2) {
          error = this.getValidationMessage('minLength', fieldName);
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          error = this.getValidationMessage('required', fieldName);
        } else if (!this.isValidEmail(value)) {
          error = this.getValidationMessage('email', fieldName);
        }
        break;
      
      case 'phone':
        if (value && !this.isValidPhone(value)) {
          error = this.getValidationMessage('phone', fieldName);
        }
        break;
      
      case 'message':
        if (!value.trim()) {
          error = this.getValidationMessage('required', fieldName);
        } else if (value.trim().length < 10) {
          error = this.getValidationMessage('minLength', fieldName);
        }
        break;
    }

    this.validationErrors[fieldName] = error;
  }

  clearFieldError(fieldName: string): void {
    this.validationErrors[fieldName] = null;
  }

  getFieldError(fieldName: string): string | null {
    return this.validationErrors[fieldName] || null;
  }

  getValidationMessage(type: string, field: string): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const messages = {
      ar: {
        required: 'هذا الحقل مطلوب',
        email: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
        phone: 'يرجى إدخال رقم هاتف صحيح',
        minLength: 'يرجى إدخال قيمة أطول'
      },
      en: {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        minLength: 'Please enter a longer value'
      },
      fr: {
        required: 'Ce champ est requis',
        email: 'Veuillez saisir une adresse email valide',
        phone: 'Veuillez saisir un numéro de téléphone valide',
        minLength: 'Veuillez saisir une valeur plus longue'
      }
    };
    return messages[currentLang as keyof typeof messages][type as keyof typeof messages.ar];
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  isFormValid(): boolean {
    const requiredFields = ['firstName', 'lastName', 'email', 'message'];
    
    // Check if all required fields have values
    for (const field of requiredFields) {
      if (!this.formData[field as keyof FormData].trim()) {
        return false;
      }
    }
    
    // Check if there are any validation errors
    for (const field in this.validationErrors) {
      if (this.validationErrors[field]) {
        return false;
      }
    }
    
    return true;
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) return;

    // Validate all fields
    Object.keys(this.formData).forEach(field => this.validateField(field));

    if (!this.isFormValid()) {
      this.showMessage(this.getValidationMessage('required', ''), false);
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      this.submitSuccess = true;
      this.submitMessage = this.getSuccessMessage();
      this.resetForm();
      
    } catch (error) {
      // Error
      this.submitSuccess = false;
      this.submitMessage = this.getErrorMessage();
    } finally {
      this.isSubmitting = false;
      
      // Clear message after 5 seconds
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);
    }
  }

  getSuccessMessage(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const messages = {
      ar: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
      en: 'Your message has been sent successfully! We\'ll get back to you soon.',
      fr: 'Votre message a été envoyé avec succès ! Nous vous recontacterons bientôt.'
    };
    return messages[currentLang as keyof typeof messages];
  }

  getErrorMessage(): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const messages = {
      ar: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.',
      en: 'There was an error sending your message. Please try again.',
      fr: 'Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer.'
    };
    return messages[currentLang as keyof typeof messages];
  }

  showMessage(message: string, isSuccess: boolean): void {
    this.submitMessage = message;
    this.submitSuccess = isSuccess;
  }

  resetForm(): void {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    };
    this.validationErrors = {};
  }

  // Tracking functions for ngFor
  trackByElement(index: number, element: any): number {
    return element.id;
  }

  trackByContact(index: number, item: ContactItem): string {
    return item.title;
  }

  trackByTrust(index: number, item: TrustBadge): string {
    return item.label;
  }

  trackByOption(index: number, item: any): string {
    return item.value;
  }
}