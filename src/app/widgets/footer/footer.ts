// src/app/shared/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-section">
          <h3>Geairas House</h3>
          <p>{{ 'footer.description' | translate }}</p>
        </div>
        
        <div class="footer-section">
          <h3>{{ 'footer.quick_links' | translate }}</h3>
          <ul class="footer-links">
            <li><a routerLink="/">{{ 'nav.home' | translate }}</a></li>
            <li><a routerLink="/house">{{ 'nav.house' | translate }}</a></li>
            <li><a routerLink="/gallery">{{ 'nav.gallery' | translate }}</a></li>
            <li><a routerLink="/location">{{ 'nav.location' | translate }}</a></li>
            <li><a routerLink="/contact">{{ 'nav.contact' | translate }}</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>{{ 'footer.contact' | translate }}</h3>
          <ul class="footer-contact">
            <li>
              <i class="fas fa-envelope"></i>
              <span>EMAIL DE TESTE</span>
            </li>
            <li>
              <i class="fas fa-phone"></i>
              <span>+351 123 456 789</span>
            </li>
            <li>
              <i class="fas fa-map-marker-alt"></i>
              <span>Gaeiras, Óbidos, Portugal</span>
            </li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>{{ 'footer.follow_us' | translate }}</h3>
          <div class="footer-social">
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="container">
          <p>&copy; {{ currentYear }} Geairas House. {{ 'footer.rights' | translate }}</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--color-primary);
      color: white;
      padding-top: var(--spacing-xl);
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-xl);
      padding-bottom: var(--spacing-xl);
    }
    
    .footer-section {
      h3 {
        margin-bottom: var(--spacing-md);
        color: var(--color-accent);
      }
      
      p {
        line-height: 1.6;
      }
    }
    
    .footer-links, .footer-contact {
      list-style: none;
      padding: 0;
      
      li {
        margin-bottom: var(--spacing-sm);
        
        a {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
          
          &:hover {
            color: var(--color-accent);
          }
        }
      }
    }
    
    .footer-contact {
      li {
        display: flex;
        align-items: center;
        
        i {
          margin-right: var(--spacing-sm);
          color: var(--color-accent);
        }
      }
    }
    
    .footer-social {
      display: flex;
      gap: var(--spacing-md);
      
      .social-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: var(--color-accent);
        }
      }
    }
    
    .footer-bottom {
      background-color: rgba(0, 0, 0, 0.2);
      padding: var(--spacing-md) 0;
      text-align: center;
      
      p {
        margin: 0;
        font-size: 0.9rem;
      }
    }
  `]
})
export class FooterComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}