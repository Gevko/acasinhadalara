// src/app/shared/components/header/header.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule, LanguageSwitcherComponent],
  template: `
    <header class="header">
      <div class="container header-container">
        <div class="logo">
          <a routerLink="/">Geairas House</a>
        </div>
        <nav class="nav-menu">
          <a routerLink="/" 
             routerLinkActive="active" 
             [routerLinkActiveOptions]="{exact: true}">
            {{ 'nav.home' | translate }}
          </a>
          <a routerLink="/house" 
             routerLinkActive="active">
            {{ 'nav.house' | translate }}
          </a>
          <a routerLink="/gallery" 
             routerLinkActive="active">
            {{ 'nav.gallery' | translate }}
          </a>
          <a routerLink="/location" 
             routerLinkActive="active">
            {{ 'nav.location' | translate }}
          </a>
          <a routerLink="/contact" 
             routerLinkActive="active">
            {{ 'nav.contact' | translate }}
          </a>
          <app-language-switcher></app-language-switcher>
        </nav>
      </div>
    </header>
  `,
  // ... styles remain the same
})
export class HeaderComponent {}