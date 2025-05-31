// src/app/core/services/email.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly emailAddress = 'EMAIL DE TESTE';
  
  constructor(private http: HttpClient) {}
  
  // In a real application, this would connect to a backend service
  // For now, we'll simulate sending an email
  sendContactForm(formData: ContactFormData): Observable<any> {
    console.log('Sending email to:', this.emailAddress);
    console.log('Form data:', formData);
    
    // Simulate API call
    return of({ success: true, message: 'Email sent successfully!' })
      .pipe(
        catchError(error => {
          console.error('Error sending email:', error);
          return of({ success: false, message: 'Failed to send email. Please try again.' });
        })
      );
  }
}