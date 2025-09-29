import { Injectable, Inject, DOCUMENT } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  theme: Theme;
  isDark: boolean;
  systemPrefersDark: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'avagh-theme-v2';
  
  private themeSubject = new BehaviorSubject<Theme>('auto');
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  private systemPrefersDarkSubject = new BehaviorSubject<boolean>(false);
  
  public theme$ = this.themeSubject.asObservable();
  public isDark$ = this.isDarkSubject.asObservable();
  public systemPrefersDark$ = this.systemPrefersDarkSubject.asObservable();
  
  private mediaQuery: MediaQueryList | undefined;
  private isInitialized = false;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.initializeSystemThemeDetection();
  }

  /**
   * Initialize the theme service - call this in app initialization
   */
  async initializeTheme(): Promise<void> {
    if (this.isInitialized) return;
    
    // Detect system preference first
    this.updateSystemPreference();
    
    // Load saved theme or use auto as default
    const savedTheme = this.getSavedTheme();
    const initialTheme = savedTheme || 'auto';
    
    // Apply theme immediately to prevent flash
    this.applyTheme(initialTheme);
    this.themeSubject.next(initialTheme);
    
    // Setup theme transition after initial load
    this.enableThemeTransitions();
    
    this.isInitialized = true;
  }

  /**
   * Get current theme configuration
   */
  getThemeConfig(): ThemeConfig {
    return {
      theme: this.themeSubject.value,
      isDark: this.isDarkSubject.value,
      systemPrefersDark: this.systemPrefersDarkSubject.value
    };
  }

  /**
   * Set a specific theme with smooth transition
   */
  setTheme(theme: Theme, save: boolean = true): void {
    if (!this.isInitialized) {
      console.warn('ThemeService not initialized. Call initializeTheme() first.');
      return;
    }

    this.themeSubject.next(theme);
    
    if (save) {
      this.saveTheme(theme);
    }
    
    this.applyTheme(theme);
    
    // Dispatch custom event for components that need to know about theme changes
    this.dispatchThemeChangeEvent(theme);
  }

  /**
   * Toggle between light and dark themes intelligently
   */
  toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    const isDark = this.isDarkSubject.value;
    
    let newTheme: Theme;
    
    if (currentTheme === 'auto') {
      // If auto, switch to opposite of current system preference
      newTheme = isDark ? 'light' : 'dark';
    } else {
      // If manual setting, toggle between light/dark
      newTheme = isDark ? 'light' : 'dark';
    }
    
    this.setTheme(newTheme);
  }

  /**
   * Cycle through all theme options
   */
  cycleTheme(): void {
    const currentTheme = this.themeSubject.value;
    const themes: Theme[] = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    
    this.setTheme(themes[nextIndex]);
  }

  /**
   * Apply theme to document with smooth transitions
   */
  private applyTheme(theme: Theme): void {
    const html = this.document.documentElement;
    const body = this.document.body;
    
    // Determine if should be dark
    let shouldBeDark = false;
    switch (theme) {
      case 'light':
        shouldBeDark = false;
        break;
      case 'dark':
        shouldBeDark = true;
        break;
      case 'auto':
        shouldBeDark = this.systemPrefersDarkSubject.value;
        break;
    }
    
    // Update classes
    html.classList.remove('theme-light', 'theme-dark');
    body.classList.remove('theme-light', 'theme-dark');
    
    const themeClass = shouldBeDark ? 'theme-dark' : 'theme-light';
    html.classList.add(themeClass);
    body.classList.add(themeClass);
    
    // Update data attributes for CSS targeting
    html.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
    html.setAttribute('data-theme-mode', theme);
    
    // Update color scheme meta tag
    this.updateColorSchemeMeta(shouldBeDark);
    
    // Update subjects
    this.isDarkSubject.next(shouldBeDark);
  }

  /**
   * Initialize system theme detection
   */
  private initializeSystemThemeDetection(): void {
    if (typeof window === 'undefined') return;
    
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.updateSystemPreference();
    
    // Listen for system theme changes
    if (this.mediaQuery.addEventListener) {
      this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
    } else {
      // Fallback for older browsers
      this.mediaQuery.addListener(this.handleSystemThemeChange.bind(this));
    }
  }

  /**
   * Update system preference
   */
  private updateSystemPreference(): void {
    if (!this.mediaQuery) return;
    
    const prefersDark = this.mediaQuery.matches;
    this.systemPrefersDarkSubject.next(prefersDark);
  }

  /**
   * Handle system theme changes
   */
  private handleSystemThemeChange(): void {
    this.updateSystemPreference();
    
    // If theme is set to auto, reapply theme
    if (this.themeSubject.value === 'auto') {
      this.applyTheme('auto');
    }
  }

  /**
   * Update color scheme meta tag for better browser integration
   */
  private updateColorSchemeMeta(isDark: boolean): void {
    let metaTag = this.document.querySelector('meta[name="color-scheme"]') as HTMLMetaElement;
    
    if (!metaTag) {
      metaTag = this.document.createElement('meta');
      metaTag.name = 'color-scheme';
      this.document.head.appendChild(metaTag);
    }
    
    metaTag.content = isDark ? 'dark light' : 'light dark';
  }

  /**
   * Enable smooth theme transitions after initial load
   */
  private enableThemeTransitions(): void {
    // Add transition classes after a brief delay to prevent FOUC
    setTimeout(() => {
      this.document.documentElement.classList.add('theme-transitions-enabled');
      this.document.body.classList.add('theme-transitions-enabled');
    }, 100);
  }

  /**
   * Dispatch custom theme change event
   */
  private dispatchThemeChangeEvent(theme: Theme): void {
    const event = new CustomEvent('themechange', {
      detail: {
        theme,
        isDark: this.isDarkSubject.value,
        systemPrefersDark: this.systemPrefersDarkSubject.value
      }
    });
    
    this.document.dispatchEvent(event);
  }

  /**
   * Save theme preference
   */
  private saveTheme(theme: Theme): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const themeData = {
          theme,
          timestamp: Date.now()
        };
        localStorage.setItem(this.THEME_STORAGE_KEY, JSON.stringify(themeData));
      } catch (error) {
        console.warn('Failed to save theme preference:', error);
      }
    }
  }

  /**
   * Load saved theme preference
   */
  private getSavedTheme(): Theme | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem(this.THEME_STORAGE_KEY);
        if (!saved) return null;
        
        const themeData = JSON.parse(saved);
        
        // Validate theme data
        if (themeData && ['light', 'dark', 'auto'].includes(themeData.theme)) {
          return themeData.theme;
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
        // Clear corrupted data
        localStorage.removeItem(this.THEME_STORAGE_KEY);
      }
    }
    return null;
  }

  /**
   * Clear saved theme preference
   */
  clearSavedTheme(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.removeItem(this.THEME_STORAGE_KEY);
      } catch (error) {
        console.warn('Failed to clear theme preference:', error);
      }
    }
  }

  /**
   * Get available theme options with labels
   */
  getAvailableThemes(): Array<{ value: Theme; label: string; icon: string }> {
    return [
      { value: 'light', label: 'Light', icon: '☀️' },
      { value: 'dark', label: 'Dark', icon: '🌙' },
      { value: 'auto', label: 'System', icon: '💻' }
    ];
  }

  /**
   * Check if device supports dark mode
   */
  supportsDarkMode(): boolean {
    return typeof window !== 'undefined' && 
           window.matchMedia && 
           window.matchMedia('(prefers-color-scheme)').matches;
  }

  /**
   * Get theme name for display
   */
  getThemeDisplayName(theme?: Theme): string {
    const currentTheme = theme || this.themeSubject.value;
    const themes = this.getAvailableThemes();
    return themes.find(t => t.value === currentTheme)?.label || 'Unknown';
  }

  /**
   * Cleanup method
   */
  destroy(): void {
    if (this.mediaQuery) {
      if (this.mediaQuery.removeEventListener) {
        this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange.bind(this));
      } else {
        // Fallback for older browsers
        this.mediaQuery.removeListener(this.handleSystemThemeChange.bind(this));
      }
    }
  }
}