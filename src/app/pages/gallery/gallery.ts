// src/app/pages/gallery/gallery.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryFilterComponent } from '../../features/gallery-browser/ui/gallery-filter/gallery-filter';
import { GalleryGridComponent } from '../../features/gallery-browser/ui/gallery-grid/gallery-grid';
import { GalleryLightboxComponent } from '../../features/gallery-browser/ui/gallery-lightbox/gallery-lightbox';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule, 
    GalleryFilterComponent, 
    GalleryGridComponent, 
    GalleryLightboxComponent
  ],
  template: `
    <div class="gallery-banner">
      <div class="container">
        <h1>{{ 'gallery.title' | translate }}</h1>
      </div>
    </div>

    <section class="container gallery-section">
      <app-gallery-filter></app-gallery-filter>
      <app-gallery-grid></app-gallery-grid>
      <app-gallery-lightbox></app-gallery-lightbox>
    </section>
  `,
  styles: [`
    .gallery-banner {
      background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/gallery-banner-1.jpg');
      background-size: cover;
      background-position: center;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin-top: 80px;
    }
    
    .gallery-banner h1 {
      font-size: 3rem;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .gallery-section {
      padding: 3rem 0;
    }
  `]
})
export class GalleryPageComponent {}