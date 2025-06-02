// src/app/features/review-submission/ui/review-form.component.ts
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Review } from '../../../../entities/review/model/review.model';
import { ReviewSubmissionService } from '../../api/review-submission.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  template: `
    <div class="review-form-container">
      <h3>{{ 'reviews.leave_review' | translate }}</h3>
      
      <div *ngIf="formSuccess" class="alert success">
        <i class="fas fa-check-circle"></i>
        {{ 'reviews.success_message' | translate }}
      </div>
      
      <div *ngIf="formError" class="alert error">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMessage || 'reviews.error_message' | translate }}
      </div>
      
      <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="review-form">
        <div class="form-group">
          <label for="name">{{ 'reviews.form.name' | translate }} *</label>
          <input 
            type="text" 
            id="name" 
            formControlName="name"
            [class.invalid]="reviewForm.get('name')?.invalid && (reviewForm.get('name')?.touched || formSubmitted)">
          <div class="error-message" *ngIf="reviewForm.get('name')?.invalid && (reviewForm.get('name')?.touched || formSubmitted)">
            {{ 'reviews.errors.name_required' | translate }}
          </div>
        </div>
        
        <div class="form-group">
          <label>{{ 'reviews.form.rating' | translate }} *</label>
          <div class="rating-input">
            <div class="stars">
              <input type="radio" id="star5" name="rating" value="5" formControlName="rating">
              <label for="star5"><i class="fas fa-star"></i></label>
              
              <input type="radio" id="star4" name="rating" value="4" formControlName="rating">
              <label for="star4"><i class="fas fa-star"></i></label>
              
              <input type="radio" id="star3" name="rating" value="3" formControlName="rating">
              <label for="star3"><i class="fas fa-star"></i></label>
              
              <input type="radio" id="star2" name="rating" value="2" formControlName="rating">
              <label for="star2"><i class="fas fa-star"></i></label>
              
              <input type="radio" id="star1" name="rating" value="1" formControlName="rating">
              <label for="star1"><i class="fas fa-star"></i></label>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="comment">{{ 'reviews.form.comment' | translate }} *</label>
          <textarea 
            id="comment" 
            formControlName="comment" 
            rows="5"
            [class.invalid]="reviewForm.get('comment')?.invalid && (reviewForm.get('comment')?.touched || formSubmitted)"></textarea>
          <div class="error-message" *ngIf="reviewForm.get('comment')?.invalid && (reviewForm.get('comment')?.touched || formSubmitted)">
            {{ 'reviews.errors.comment_required' | translate }}
          </div>
        </div>
        
        <button type="submit" class="submit-button" [disabled]="isSubmitting">
          <span *ngIf="isSubmitting">
            <i class="fas fa-spinner fa-spin"></i>
          </span>
          {{ 'reviews.form.submit' | translate }}
        </button>
      </form>
    </div>
  `,
  styleUrls: ['./review-form.scss']
})
export class ReviewFormComponent implements OnInit, OnDestroy {
  @Output() reviewSubmitted = new EventEmitter<Review>();
  
  reviewForm!: FormGroup;
  formSubmitted = false;
  formSuccess = false;
  formError = false;
  errorMessage = '';
  isSubmitting = false;
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private formBuilder: FormBuilder,
    private reviewSubmissionService: ReviewSubmissionService
  ) {}
  
  ngOnInit() {
    this.initForm();
    this.subscribeToSubmissionStatus();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private initForm() {
    this.reviewForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  
  private subscribeToSubmissionStatus() {
    this.reviewSubmissionService.submissionSuccess$
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        this.formSuccess = success;
      });
    
    this.reviewSubmissionService.submissionError$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        this.formError = !!error;
        this.errorMessage = error;
      });
  }
  
  onSubmit() {
    this.formSubmitted = true;
    
    if (this.reviewForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    
    const newReview: Partial<Review> = {
      name: this.reviewForm.value.name,
      rating: this.reviewForm.value.rating,
      date: new Date().toISOString().split('T')[0],
      comment: this.reviewForm.value.comment
    };
    
    this.reviewSubmissionService.submitReview(newReview)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: Review) => {
          this.isSubmitting = false;
          this.reviewSubmissionService.setSubmissionSuccess();
          this.reviewForm.reset({ rating: 5 });
          this.formSubmitted = false;
          this.reviewSubmitted.emit(response);
        },
        error: (error: Error) => {
          this.isSubmitting = false;
          this.reviewSubmissionService.setSubmissionError(error.message || 'Error submitting review');
          console.error('Error submitting review:', error);
        }
      });
  }
}