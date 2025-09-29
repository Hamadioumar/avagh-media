import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme, ThemeConfig } from '../../services/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-toggle-container">
      <button
        class="theme-toggle"
        (click)="cycleTheme()"
        [attr.aria-label]="getToggleAriaLabel()"
        [attr.data-theme]="currentTheme"
        type="button"
        role="switch"
        [attr.aria-checked]="isDark">
        
        <!-- Theme Icons with smooth transitions -->
        <div class="icon-container">
          <svg 
            class="icon icon-sun"
            [class.active]="!isDark && currentTheme === 'light'"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            aria-hidden="true">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          
          <svg 
            class="icon icon-moon"
            [class.active]="isDark && currentTheme === 'dark'"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          
          <svg 
            class="icon icon-auto"
            [class.active]="currentTheme === 'auto'"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </div>
        
        <!-- Optional text label for larger screens -->
        <span class="theme-label" *ngIf="showLabel">
          {{ getThemeDisplayName() }}
        </span>
        
        <!-- Visual indicator -->
        <div class="indicator" [class.dark]="isDark"></div>
      </button>
      
      <!-- Extended theme menu (optional) -->
      <div class="theme-menu" [class.show]="showMenu" *ngIf="showExtendedMenu">
        <div class="theme-options">
          <button 
            *ngFor="let option of themeOptions"
            class="theme-option"
            [class.active]="currentTheme === option.value"
            (click)="setTheme(option.value)"
            [attr.aria-label]="option.label"
            type="button">
            <span class="option-icon">{{ option.icon }}</span>
            <span class="option-label">{{ option.label }}</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .theme-toggle-container {
      position: relative;
      display: inline-block;
    }

    .theme-toggle {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      background: rgba(248, 250, 252, 0.8);
      border: 1px solid rgba(203, 213, 225, 0.3);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
      
      &:hover {
        background: rgba(248, 250, 252, 1);
        border-color: rgba(99, 102, 241, 0.2);
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
      }
      
      &:focus-visible {
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
      }
      
      &:active {
        transform: translateY(0);
      }
    }

    :global(.theme-dark) .theme-toggle {
      background: rgba(51, 65, 85, 0.8);
      border-color: rgba(71, 85, 105, 0.4);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      
      &:hover {
        background: rgba(51, 65, 85, 1);
        border-color: rgba(99, 102, 241, 0.3);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }
    }

    .icon-container {
      position: relative;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon {
      position: absolute;
      width: 20px;
      height: 20px;
      color: #64748b;
      opacity: 0;
      transform: scale(0.8) rotate(45deg);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      
      &.active {
        opacity: 1;
        transform: scale(1) rotate(0deg);
        color: #4f46e5;
      }
      
      :global(.theme-dark) & {
        color: #94a3b8;
        
        &.active {
          color: #6366f1;
        }
      }
    }

    .icon-sun.active {
      color: #f59e0b;
      filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.3));
    }

    .icon-moon.active {
      color: #6366f1;
      filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));
    }

    .icon-auto.active {
      color: #8b5cf6;
    }

    .theme-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: color 0.3s ease;
      
      :global(.theme-dark) & {
        color: #94a3b8;
      }
    }

    .indicator {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      opacity: 0.6;
      transition: all 0.3s ease;
      
      &.dark {
        background: #6366f1;
      }
    }

    .theme-menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(203, 213, 225, 0.2);
      border-radius: 16px;
      padding: 0.5rem;
      min-width: 150px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px) scale(0.95);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1);
      z-index: 1000;
      
      &.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
      }
      
      :global(.theme-dark) & {
        background: rgba(30, 41, 59, 0.95);
        border-color: rgba(71, 85, 105, 0.3);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
      }
    }

    .theme-options {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .theme-option {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
      width: 100%;
      text-align: left;
      
      &:hover {
        background: rgba(99, 102, 241, 0.08);
      }
      
      &:focus-visible {
        background: rgba(99, 102, 241, 0.08);
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
      }
      
      &.active {
        background: rgba(99, 102, 241, 0.1);
        
        .option-icon {
          filter: drop-shadow(0 0 4px currentColor);
        }
        
        .option-label {
          color: #4f46e5;
          font-weight: 600;
        }
      }
      
      :global(.theme-dark) & {
        &:hover {
          background: rgba(99, 102, 241, 0.12);
        }
        
        &.active .option-label {
          color: #6366f1;
        }
      }
    }

    .option-icon {
      font-size: 1.125rem;
      transition: filter 0.3s ease;
    }

    .option-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #475569;
      transition: all 0.3s ease;
      
      :global(.theme-dark) & {
        color: #cbd5e1;
      }
    }

    /* Smooth theme transitions */
    :global(.theme-transitions-enabled) .theme-toggle {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                  background 0.4s ease,
                  border-color 0.4s ease;
    }

    :global(.theme-transitions-enabled) .icon,
    :global(.theme-transitions-enabled) .theme-label,
    :global(.theme-transitions-enabled) .option-label {
      transition: all 0.4s ease,
                  color 0.4s ease;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
      .theme-toggle {
        padding: 0.625rem;
        
        .theme-label {
          display: none;
        }
      }
      
      .theme-menu {
        right: -50%;
        transform: translateX(50%) translateY(-8px) scale(0.95);
        
        &.show {
          transform: translateX(50%) translateY(0) scale(1);
        }
      }
    }

    /* High contrast support */
    @media (prefers-contrast: high) {
      .theme-toggle {
        border: 2px solid #1e293b;
        background: white;
        
        :global(.theme-dark) & {
          border-color: #f8fafc;
          background: #1e293b;
        }
      }
      
      .icon.active {
        color: #1e293b !important;
        
        :global(.theme-dark) & {
          color: #f8fafc !important;
        }
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .theme-toggle,
      .icon,
      .theme-menu,
      .indicator {
        transition-duration: 0.1s;
      }
    }

    /* RTL support */
    [dir="rtl"] .theme-menu {
      right: auto;
      left: 0;
    }

    [dir="rtl"] .theme-option {
      text-align: right;
    }
  `]
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'auto';
  isDark = false;
  systemPrefersDark = false;
  showLabel = false;
  showExtendedMenu = false;
  showMenu = false;
  
  themeOptions = [
    { value: 'light' as Theme, label: 'Light', icon: '☀️' },
    { value: 'dark' as Theme, label: 'Dark', icon: '🌙' },
    { value: 'auto' as Theme, label: 'System', icon: '💻' }
  ];
  
  private subscriptions: Subscription[] = [];

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Subscribe to theme changes
    const themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    const isDarkSubscription = this.themeService.isDark$.subscribe(isDark => {
      this.isDark = isDark;
    });

    const systemSubscription = this.themeService.systemPrefersDark$.subscribe(prefersDark => {
      this.systemPrefersDark = prefersDark;
    });

    this.subscriptions.push(themeSubscription, isDarkSubscription, systemSubscription);

    // Get initial theme config
    const config = this.themeService.getThemeConfig();
    this.currentTheme = config.theme;
    this.isDark = config.isDark;
    this.systemPrefersDark = config.systemPrefersDark;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  cycleTheme() {
    this.themeService.cycleTheme();
    this.announceThemeChange();
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
    this.showMenu = false;
    this.announceThemeChange();
  }

  toggleExtendedMenu() {
    this.showMenu = !this.showMenu;
  }

  getToggleAriaLabel(): string {
    return `Switch theme. Current: ${this.getThemeDisplayName()}`;
  }

  getThemeDisplayName(): string {
    return this.themeService.getThemeDisplayName();
  }

  private announceThemeChange() {
    // Announce theme change for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${this.getThemeDisplayName()}`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}