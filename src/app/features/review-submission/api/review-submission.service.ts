// src/app/features/review-submission/api/review-submission.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReviewApiService } from '../../../entities/review/api/review.service';
import { Review } from '../../../entities/review/model/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewSubmissionService {
  private submissionSuccessSubject = new BehaviorSubject<boolean>(false);
  private submissionErrorSubject = new BehaviorSubject<string>('');
  
  constructor(private reviewApiService: ReviewApiService) {}
  
  get submissionSuccess$(): Observable<boolean> {
    return this.submissionSuccessSubject.asObservable();
  }
  
  get submissionError$(): Observable<string> {
    return this.submissionErrorSubject.asObservable();
  }
  
  resetStatus(): void {
    this.submissionSuccessSubject.next(false);
    this.submissionErrorSubject.next('');
  }
  
  submitReview(reviewData: Partial<Review>): Observable<Review> {
    return this.reviewApiService.addReview(reviewData);
  }
  
  setSubmissionSuccess(): void {
    this.submissionSuccessSubject.next(true);
    
    // Auto-reset after 5 seconds
    setTimeout(() => {
      this.submissionSuccessSubject.next(false);
    }, 5000);
  }
  
  setSubmissionError(message: string): void {
    this.submissionErrorSubject.next(message);
    
    // Auto-reset after 5 seconds
    setTimeout(() => {
      this.submissionErrorSubject.next('');
    }, 5000);
  }
}