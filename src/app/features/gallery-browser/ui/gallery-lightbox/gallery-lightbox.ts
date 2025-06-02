// src/app/features/gallery-browser/ui/gallery-lightbox/gallery-lightbox.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../api/gallery.service';
import { GalleryItem } from '../../../../entities/gallery-item/model/gallery-item';

@Component({
  selector: 'app-gallery-lightbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lightbox" *ngIf="showLightbox">
      <div class="lightbox-content">
        <button class="close-button" (click)="closeLightbox()">
          <i class="fas fa-times"></i>
        </button>
        
        <button class="nav-button prev-button" (click)="prevImage()">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="lightbox-image-container">
          <img [src]="currentImage?.src" [alt]="currentImage?.alt">
          <p class="image-caption">{{ currentImage?.alt }}</p>
        </div>
        
        <button class="nav-button next-button" (click)="nextImage()">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
      display: flex;
      align-items: center;
    }
    
    .lightbox-image-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .lightbox-image-container img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
    }
    
    .image-caption {
      color: white;
      margin-top: 1rem;
      font-size: 1rem;
    }
    
    .close-button {
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
    
    .nav-button {
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
      padding: 1rem;
      z-index: 1001;
    }
    
    .prev-button {
      margin-right: 1rem;
    }
    
    .next-button {
      margin-left: 1rem;
    }
  `]
})
export class GalleryLightboxComponent implements OnInit, OnDestroy {
  showLightbox: boolean = false;
  currentIndex: number = 0;
  filteredItems: GalleryItem[] = [];
  
  private openLightboxListener: any;
  
  constructor(private galleryService: GalleryService) {}
  
  ngOnInit(): void {
    this.galleryService.getSelectedCategory().subscribe(category => {
      this.filteredItems = this.galleryService.getFilteredItems(category);
    });
    
    this.openLightboxListener = (event: CustomEvent) => {
      this.currentIndex = event.detail.index;
      this.showLightbox = true;
      document.body.classList.add('no-scroll');
    };
    
    document.addEventListener('open-lightbox', this.openLightboxListener);
  }
  
  ngOnDestroy(): void {
    document.removeEventListener('open-lightbox', this.openLightboxListener);
    document.body.classList.remove('no-scroll');
  }
  
  get currentImage(): GalleryItem | undefined {
    return this.filteredItems[this.currentIndex];
  }
  
  closeLightbox(): void {
    this.showLightbox = false;
    document.body.classList.remove('no-scroll');
  }
  
  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
  }
  
  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.filteredItems.length;
  }
}