// src/app/widgets/reviews-list/reviews-list.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StarRatingComponent } from '../../entities/review/ui/star-rating/star-rating';
import { Review } from '../../entities/review/model/review.model';


@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, StarRatingComponent],
  template: `
    <div class="reviews-list">
      <h3>{{ 'reviews.recent_reviews' | translate }}</h3>
      
      <div *ngIf="loading" class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i>
        <p>{{ 'reviews.loading' | translate }}</p>
      </div>
      
      <div *ngIf="!loading && reviews.length === 0" class="no-reviews">
        <i class="fas fa-comment-slash"></i>
        <p>{{ 'reviews.no_reviews' | translate }}</p>
      </div>
      
      <div *ngFor="let review of reviews" class="review-card">
        <div class="review-header">
          <h4>{{ review.name }}</h4>
          <div class="review-date">{{ review.date }}</div>
        </div>
        
        <app-star-rating [rating]="review.rating"></app-star-rating>
        
        <div class="review-comment">
          <p>{{ review.comment }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./reviews-list.scss']
})
export class ReviewsListComponent {
  @Input() reviews: Review[] = [];
  @Input() loading: boolean = false;
}