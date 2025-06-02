// src/app/shared/components/image-viewer/image-viewer.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="image-viewer" *ngIf="isOpen">
      <div class="overlay" (click)="close()"></div>
      <div class="viewer-content">
        <button class="close-btn" (click)="close()">
          <i class="fas fa-times"></i>
        </button>
        <div class="image-container">
          <img [src]="currentImage" [alt]="currentAlt || 'Image'">
        </div>
        <div class="navigation" *ngIf="images.length > 1">
          <button class="nav-btn prev" (click)="prevImage()" [disabled]="currentIndex === 0">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="image-counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
          <button class="nav-btn next" (click)="nextImage()" [disabled]="currentIndex === images.length - 1">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .image-viewer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
    }
    
    .viewer-content {
      position: relative;
      z-index: 1001;
      max-width: 90%;
      max-height: 90%;
      display: flex;
      flex-direction: column;
    }
    
    .close-btn {
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      z-index: 1002;
    }
    
    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      
      img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
      }
    }
    
    .navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      color: white;
    }
    
    .nav-btn {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 10px;
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    .image-counter {
      font-size: 14px;
    }
  `]
})
export class ImageViewerComponent {
  @Input() isOpen: boolean = false;
  @Input() images: string[] = [];
  @Input() alts: string[] = [];
  @Input() currentIndex: number = 0;
  
  @Output() closeEvent = new EventEmitter<void>();
  
  get currentImage(): string {
    return this.images[this.currentIndex] || '';
  }
  
  get currentAlt(): string {
    return this.alts[this.currentIndex] || '';
  }
  
  nextImage(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  close() {
    this.closeEvent.emit();
  }
  
  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}