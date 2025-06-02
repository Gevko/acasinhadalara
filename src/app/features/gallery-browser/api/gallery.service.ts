// src/app/features/gallery-browser/api/gallery.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GalleryItem } from '../../../entities/gallery-item/model/gallery-item';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private galleryItems: GalleryItem[] = [
    { id: 1, src: '/images/exterior-1.jpg', alt: 'House Front View', category: 'exterior' },
    { id: 2, src: '/images/exterior-2.jpg', alt: 'Garden View', category: 'exterior' },
    { id: 3, src: '/images/pool-1.jpg', alt: 'Swimming Pool', category: 'exterior' },
    { id: 4, src: '/images/jacuzzi-1.jpg', alt: 'Jacuzzi', category: 'exterior' },
    { id: 5, src: '/images/living-1.jpg', alt: 'Living Room', category: 'interior' },
    { id: 6, src: '/images/kitchen-1.jpg', alt: 'Kitchen', category: 'interior' },
    { id: 7, src: '/images/dining-1.jpg', alt: 'Dining Area', category: 'interior' },
    { id: 8, src: '/images/master-1.jpg', alt: 'Master Bedroom', category: 'bedrooms' },
    { id: 9, src: '/images/bedroom-2.jpg', alt: 'Second Bedroom', category: 'bedrooms' },
    { id: 10, src: '/images/bedroom-3.jpg', alt: 'Third Bedroom', category: 'bedrooms' },
    { id: 11, src: '/images/bathroom-1.jpg', alt: 'Master Bathroom', category: 'amenities' },
    { id: 12, src: '/images/bbq-1.jpg', alt: 'BBQ Area', category: 'amenities' }
  ];
  
  private categories: string[] = ['all', 'exterior', 'interior', 'bedrooms', 'amenities'];
  private selectedCategorySubject = new BehaviorSubject<string>('all');
  
  constructor() {}
  
  getGalleryItems(): GalleryItem[] {
    return this.galleryItems;
  }
  
  getCategories(): string[] {
    return this.categories;
  }
  
  getSelectedCategory(): Observable<string> {
    return this.selectedCategorySubject.asObservable();
  }
  
  setSelectedCategory(category: string): void {
    this.selectedCategorySubject.next(category);
  }
  
  getFilteredItems(category: string): GalleryItem[] {
    if (category === 'all') {
      return this.galleryItems;
    }
    return this.galleryItems.filter(item => item.category === category);
  }
}