// src/app/entities/review/api/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../model/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewApiService {
  constructor(private http: HttpClient) {}
  
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>('/api/reviews');
  }
  
  addReview(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>('/.netlify/functions/add-review', review);
  }
}