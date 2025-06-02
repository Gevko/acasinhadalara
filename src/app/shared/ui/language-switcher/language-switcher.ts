// src/app/shared/components/language-switcher/language-switcher.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-switcher">
      <button class="language-button" (click)="toggleDropdown()">
        {{ currentLanguage.name }} <i class="fas fa-chevron-down"></i>
      </button>
      <div class="language-dropdown" [class.show]="showDropdown">
        <button 
          *ngFor="let lang of languages" 
          (click)="changeLanguage(lang.code)"
          [class.active]="currentLanguage.code === lang.code">
          {{ lang.name }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .language-switcher {
      position: relative;
    }
    
    .language-button {
      background: none;
      border: none;
      color: var(--color-text);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-xs) var(--spacing-sm);
      
      i {
        font-size: 0.8rem;
      }
    }
    
    .language-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 4px;
      min-width: 120px;
      display: none;
      z-index: 1000;
      
      &.show {
        display: block;
      }
      
      button {
        display: block;
        width: 100%;
        text-align: left;
        padding: var(--spacing-sm) var(--spacing-md);
        border: none;
        background: none;
        cursor: pointer;
        
        &:hover {
          background-color: #f9f9f9;
        }
        
        &.active {
          color: var(--color-accent);
          font-weight: 500;
        }
      }
    }
  `]
})
export class LanguageSwitcherComponent {
  showDropdown = false;
  
  languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' }
  ];
  
  constructor(private translate: TranslateService) {}
  
  get currentLanguage(): Language {
    const currentLang = this.translate.currentLang || 'en';
    return this.languages.find(lang => lang.code === currentLang) || this.languages[0];
  }
  
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  
  changeLanguage(langCode: string): void {
    this.translate.use(langCode);
    this.showDropdown = false;
  }
}