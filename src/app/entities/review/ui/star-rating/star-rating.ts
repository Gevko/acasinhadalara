// src/app/entities/review/ui/star-rating/star-rating.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="star-rating">
      <span *ngFor="let star of filledStars" class="star filled">
        <i class="fas fa-star"></i>
      </span>
      <span *ngFor="let star of emptyStars" class="star">
        <i class="far fa-star"></i>
      </span>
    </div>
  `,
  styles: [`
    .star-rating {
      display: inline-flex;
    }
    .star {
      color: #ddd;
      margin-right: 2px;
    }
    .star.filled {
      color: #FFD700;
    }
  `]
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  
  get filledStars(): number[] {
    return Array(this.rating).fill(0);
  }
  
  get emptyStars(): number[] {
    return Array(5 - this.rating).fill(0);
  }
}