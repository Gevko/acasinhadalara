// src/app/features/gallery/gallery.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryItem } from '../../entities/GalleryItem';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss']
})
export class GalleryComponent {
  selectedCategory: string = 'all';
  showLightbox: boolean = false;
  currentImageIndex: number = 0;
  
  categories: string[] = ['all', 'exterior', 'interior', 'bedrooms', 'amenities'];
  
  galleryItems: GalleryItem[] = [
    { id: 1, src: 'assets/images/gallery/exterior-1.jpg', alt: 'House Front View', category: 'exterior' },
    { id: 2, src: 'assets/images/gallery/exterior-2.jpg', alt: 'Garden View', category: 'exterior' },
    { id: 3, src: 'assets/images/gallery/pool-1.jpg', alt: 'Swimming Pool', category: 'exterior' },
    { id: 4, src: 'assets/images/gallery/jacuzzi-1.jpg', alt: 'Jacuzzi', category: 'exterior' },
    { id: 5, src: 'assets/images/gallery/living-1.jpg', alt: 'Living Room', category: 'interior' },
    { id: 6, src: 'assets/images/gallery/kitchen-1.jpg', alt: 'Kitchen', category: 'interior' },
    { id: 7, src: 'assets/images/gallery/dining-1.jpg', alt: 'Dining Area', category: 'interior' },
    { id: 8, src: 'assets/images/gallery/master-1.jpg', alt: 'Master Bedroom', category: 'bedrooms' },
    { id: 9, src: 'assets/images/gallery/bedroom-2.jpg', alt: 'Second Bedroom', category: 'bedrooms' },
    { id: 10, src: 'assets/images/gallery/bedroom-3.jpg', alt: 'Third Bedroom', category: 'bedrooms' },
    { id: 11, src: 'assets/images/gallery/bathroom-1.jpg', alt: 'Master Bathroom', category: 'amenities' },
    { id: 12, src: 'assets/images/gallery/bbq-1.jpg', alt: 'BBQ Area', category: 'amenities' }
  ];
  
  get filteredItems(): GalleryItem[] {
    if (this.selectedCategory === 'all') {
      return this.galleryItems;
    }
    return this.galleryItems.filter(item => item.category === this.selectedCategory);
  }
  
  setCategory(category: string): void {
    this.selectedCategory = category;
  }
  
  openLightbox(index: number): void {
    this.currentImageIndex = index;
    this.showLightbox = true;
    document.body.classList.add('no-scroll');
  }
  
  closeLightbox(): void {
    this.showLightbox = false;
    document.body.classList.remove('no-scroll');
  }
  
  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
  }
  
  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredItems.length;
  }
}