// src/app/pages/contact/contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContactFormComponent } from '../../features/email-submission/ui/contact-form/contact-form';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, ContactFormComponent],
  template: `
    <div class="contact-banner">
      <div class="container">
        <h1>{{ 'contact.title' | translate }}</h1>
      </div>
    </div>

    <section class="container contact-section">
      <div class="contact-content">
        <div class="contact-info">
          <h2>{{ 'contact.get_in_touch' | translate }}</h2>
          <p class="contact-description">{{ 'contact.description' | translate }}</p>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-details">
                <h3>{{ 'contact.email' | translate }}</h3>
                <p><a href="mailto:{{ email }}">{{ email }}</a></p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="contact-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="contact-details">
                <h3>{{ 'contact.phone' | translate }}</h3>
                <p><a href="tel:+351938141667">{{ phone }}</a></p>
                <p><a href="tel:+351910855609">{{ phone2 }}</a></p>

              </div>
            </div>
            
            <div class="contact-method">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="contact-details">
                <h3>{{ 'contact.address' | translate }}</h3>
                <p>{{ address }}</p>
              </div>
            </div>
          </div>
          
          <div class="social-links">
            <h3>{{ 'contact.follow_us' | translate }}</h3>
            <div class="social-icons">
              <a href="#" class="social-icon" aria-label="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <app-contact-form></app-contact-form>
      </div>
    </section>
  `,
  styles: [`
    .contact-banner {
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/contact-banner-1.jpg');
      background-size: cover;
      background-position: center;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin-top: 80px;
      text-align: center;
      position: relative;
    }
    
    .contact-banner::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.9));
    }
    
    .contact-banner h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      position: relative;
      z-index: 1;
    }
    
    .banner-subtitle {
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      position: relative;
      z-index: 1;
    }
    
    .contact-section {
      padding: var(--spacing-xxl, 4rem) 0;
      position: relative;
      z-index: 2;
      background-color: white;
    }
    
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-xl, 2rem);
      align-items: start;
    }
    
    .contact-info {
      padding-right: var(--spacing-xl, 2rem);
    }
    
    .contact-info h2 {
      font-size: 2.2rem;
      color: var(--color-primary, #343a40);
      margin-bottom: var(--spacing-md, 1rem);
      position: relative;
      padding-bottom: var(--spacing-sm, 0.75rem);
    }
    
    .contact-info h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: var(--color-accent, #D4B254);
    }
    
    .contact-description {
      font-size: 1.1rem;
      color: var(--color-secondary, #6c757d);
      margin-bottom: var(--spacing-lg, 1.5rem);
      line-height: 1.6;
    }
    
    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg, 1.5rem);
      margin-bottom: var(--spacing-xl, 2rem);
    }
    
    .contact-method {
      display: flex;
      align-items: flex-start;
      padding: var(--spacing-md, 1rem);
      background-color: var(--color-bg-light, #f8f9fa);
      border-radius: var(--border-radius, 8px);
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .contact-method:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
      border-color: var(--color-accent, #D4B254);
    }
    
    .contact-icon {
      width: 50px;
      height: 50px;
      background-color: var(--color-accent, #D4B254);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
      margin-right: var(--spacing-md, 1rem);
      flex-shrink: 0;
    }
    
    .contact-details {
      flex-grow: 1;
    }
    
    .contact-details h3 {
      font-size: 1.2rem;
      color: var(--color-primary, #343a40);
      margin: 0 0 var(--spacing-xs, 0.5rem) 0;
    }
    
    .contact-details p {
      margin: 0;
      color: var(--color-secondary, #6c757d);
      font-size: 1rem;
      word-break: break-word;
    }
    
    .contact-details a {
      color: var(--color-accent, #D4B254);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .contact-details a:hover {
      color: var(--color-accent-dark, #c4a244);
      text-decoration: underline;
    }
    
    .social-links {
      margin-top: var(--spacing-xl, 2rem);
    }
    
    .social-links h3 {
      font-size: 1.2rem;
      color: var(--color-primary, #343a40);
      margin-bottom: var(--spacing-md, 1rem);
    }
    
    .social-icons {
      display: flex;
      gap: var(--spacing-sm, 0.75rem);
    }
    
    .social-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--color-bg-light, #f8f9fa);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-accent, #D4B254);
      font-size: 1.2rem;
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .social-icon:hover {
      background-color: var(--color-accent, #D4B254);
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 5px 10px rgba(var(--color-accent-rgb, 212, 178, 84), 0.3);
    }
    
    @media (max-width: 992px) {
      .contact-content {
        grid-template-columns: 1fr;
      }
      
      .contact-info {
        padding-right: 0;
        margin-bottom: var(--spacing-xl, 2rem);
      }
    }
    
    @media (max-width: 768px) {
      .contact-banner {
        height: 300px;
      }
      
      .contact-banner h1 {
        font-size: 2.5rem;
      }
      
      .contact-info h2 {
        font-size: 1.8rem;
      }
    }
  `]
})
export class ContactPageComponent {
  email = 'thehouseofgaeiras@gmail.com';
  phone = '+351 938 141 667';
  phone2 = '+351 910 855 609';
  address = 'Geairas, Óbidos, Portugal';
}