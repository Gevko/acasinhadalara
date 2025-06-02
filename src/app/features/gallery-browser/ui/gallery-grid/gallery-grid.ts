// src/app/features/gallery-browser/ui/gallery-grid/gallery-grid.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GalleryService } from '../../api/gallery.service';
import { GalleryItem } from '../../../../entities/gallery-item/model/gallery-item';

@Component({
  selector: 'app-gallery-grid',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="gallery-grid">
      <div 
        class="gallery-item" 
        *ngFor="let item of filteredItems; let i = index"
        (click)="openLightbox(i)">
        <img [src]="item.src" [alt]="item.alt">
        <div class="gallery-overlay">
          <i class="fas fa-search-plus"></i>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      cursor: pointer;
      height: 0;
      padding-bottom: 75%;
    }
    
    .gallery-item img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .gallery-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .gallery-overlay i {
      color: white;
      font-size: 2rem;
    }
    
    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }
    
    .gallery-item:hover img {
      transform: scale(1.05);
    }
  `]
})
export class GalleryGridComponent implements OnInit {
  filteredItems: GalleryItem[] = [];
  
  constructor(private galleryService: GalleryService) {}
  
  ngOnInit(): void {
    this.galleryService.getSelectedCategory().subscribe(category => {
      this.filteredItems = this.galleryService.getFilteredItems(category);
    });
  }
  
  openLightbox(index: number): void {
    // Emit event to open lightbox
    document.dispatchEvent(new CustomEvent('open-lightbox', { detail: { index } }));
  }
}