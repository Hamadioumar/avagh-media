import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { ThemeService } from './app/services/theme';
 import 'zone.js';

// Initialize theme before app starts to prevent FOUC (Flash of Unstyled Content)
const initializeTheme = async () => {
  const themeService = new ThemeService(document);
  await themeService.initializeTheme();
};

// Bootstrap with theme initialization
initializeTheme().then(() => {
  bootstrapApplication(App, {
    providers: [
      provideAnimations(),
      provideHttpClient()
    ]
  }).catch(err => console.error(err));
});