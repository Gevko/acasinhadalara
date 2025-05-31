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

  <a routerLink="/reviews" 
     routerLinkActive="active">
    {{ 'nav.reviews' | translate }}
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
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 80px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      transition: all 0.3s ease;
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }

    .logo a {
      font-family: var(--font-secondary);
      font-size: 1.8rem;
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .logo a:hover {
      color: var(--color-accent);
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .nav-menu a {
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;
    }

    .nav-menu a:hover {
      color: var(--color-accent);
    }

    .nav-menu a.active {
      color: var(--color-accent);
      border-bottom: 2px solid var(--color-accent);
    }

    /* Mobile menu styles */
    @media (max-width: 768px) {
      .header {
        height: auto;
        padding: var(--spacing-sm) 0;
      }

      .header-container {
        flex-direction: column;
        padding: var(--spacing-sm) var(--spacing-md);
      }

      .logo {
        margin-bottom: var(--spacing-sm);
      }

      .nav-menu {
        flex-wrap: wrap;
        justify-content: center;
      }

      .nav-menu a {
        margin-bottom: var(--spacing-xs);
      }
    }
  `]
})
export class HeaderComponent { }