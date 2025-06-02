// src/app/features/gallery-browser/ui/gallery-filter/gallery-filter.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryService } from '../../api/gallery.service';

@Component({
  selector: 'app-gallery-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="gallery-filters">
      <button 
        *ngFor="let category of categories" 
        [class.active]="selectedCategory === category"
        (click)="setCategory(category)">
        {{ 'gallery.categories.' + category | translate }}
      </button>
    </div>
  `,
  styles: [`
    .gallery-filters {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    
    button {
      background: none;
      border: none;
      padding: 0.5rem 1rem;
      margin: 0.25rem;
      cursor: pointer;
      font-size: 1rem;
      color: var(--color-secondary);
      transition: all 0.3s ease;
      border-radius: 4px;
    }
    
    button:hover {
      color: var(--color-primary);
    }
    
    button.active {
      background-color: var(--color-accent);
      color: white;
    }
  `]
})
export class GalleryFilterComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string = 'all';
  
  constructor(private galleryService: GalleryService) {}
  
  ngOnInit(): void {
    this.categories = this.galleryService.getCategories();
    this.galleryService.getSelectedCategory().subscribe(category => {
      this.selectedCategory = category;
    });
  }
  
  setCategory(category: string): void {
    this.galleryService.setSelectedCategory(category);
  }
}