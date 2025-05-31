// src/app/core/services/translation.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'pt', 'de', 'fr', 'es']);
    this.translate.setDefaultLang('en');
    
    // Get browser language
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|pt|de|fr|es/) ? browserLang : 'en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  getCurrentLang(): string {
    return this.translate.currentLang;
  }
}