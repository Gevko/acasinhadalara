// src/app/features/reviews/reviews.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.scss']
})
export class ReviewsComponent implements OnInit {
  reviewForm!: FormGroup;
  reviews: Review[] = [];
  formSubmitted = false;
  formSuccess = false;
  formError = false;
  errorMessage = '';
  loading = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  
  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
    
    this.loadReviews();
  }
  
  loadReviews() {
    this.loading = true;
    // Fetch reviews from the JSON file
    this.http.get<Review[]>('/api/reviews')
      .subscribe({
        next: (data) => {
          this.reviews = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading reviews:', error);
          this.loading = false;
          // If there's an error, we'll still show the page but with empty reviews
          this.reviews = [];
        }
      });
  }
  
  onSubmit() {
    this.formSubmitted = true;
    
    if (this.reviewForm.invalid) {
      return;
    }
    
    const newReview: Partial<Review> = {
      name: this.reviewForm.value.name,
      rating: this.reviewForm.value.rating,
      date: new Date().toISOString().split('T')[0],
      comment: this.reviewForm.value.comment
    };
    
    // Submit the review using the Netlify function
    this.http.post<Review>('/.netlify/functions/add-review', newReview)
      .subscribe({
        next: (response) => {
          this.formSuccess = true;
          this.formError = false;
          this.reviewForm.reset({ rating: 5 });
          this.formSubmitted = false;
          
          // Add the new review to the list
          this.reviews.unshift(response);
        },
        error: (error) => {
          this.formError = true;
          this.formSuccess = false;
          this.errorMessage = error.message || 'Error submitting review';
          console.error('Error submitting review:', error);
        }
      });
  }
  
  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
  
  getEmptyStarArray(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }
}