// src/app/pages/reviews/reviews.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ReviewsListComponent } from '../../widgets/reviews-list/reviews-list';
import { ReviewFormComponent } from '../../features/review-submission/ui/review-form/review-form';
import { Review } from '../../entities/review/model/review.model';
import { ReviewApiService } from '../../entities/review/api/review.service';

@Component({
  selector: 'app-reviews-page',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule, 
    ReviewsListComponent, 
    ReviewFormComponent
  ],
  template: `
    <div class="reviews-banner">
      <div class="container">
        <h1>{{ 'reviews.title' | translate }}</h1>
      </div>
    </div>

    <section class="container reviews-section">
      <div class="reviews-intro">
        <h2>{{ 'reviews.guest_experiences' | translate }}</h2>
        <p>{{ 'reviews.description' | translate }}</p>
      </div>
      
      <div class="reviews-content">
        <app-reviews-list 
          [reviews]="reviews" 
          [loading]="loading">
        </app-reviews-list>
        
        <app-review-form 
          (reviewSubmitted)="onReviewSubmitted($event)">
        </app-review-form>
      </div>
    </section>
  `,
  styleUrls: ['./reviews.scss']
})
export class ReviewsPageComponent implements OnInit, OnDestroy {
  reviews: Review[] = [];
  loading = true;
  
  private destroy$ = new Subject<void>();
  
  constructor(private reviewApiService: ReviewApiService) {}
  
  ngOnInit() {
    this.loadReviews();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  loadReviews() {
    this.loading = true;
    
    this.reviewApiService.getReviews()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.reviews = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading reviews:', error);
          this.loading = false;
          this.reviews = [];
        }
      });
  }
  
  onReviewSubmitted(review: Review) {
    // Add the new review to the beginning of the list
    this.reviews = [review, ...this.reviews];
  }
}