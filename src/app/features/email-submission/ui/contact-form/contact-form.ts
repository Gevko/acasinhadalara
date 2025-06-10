// src/app/features/contact-form/ui/contact-form/contact-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AvailabilityCalendarComponent } from '../availability-calendar/availability-calendar';
import { AvailabilityCheckerService } from '../../api/availability/availability.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, AvailabilityCalendarComponent],
  template: `
    <div class="contact-form-container">
      <div *ngIf="formSuccess" class="alert success">
        <i class="fas fa-check-circle"></i>
        {{ 'contact.success_message' | translate }}
      </div>
      
      <div *ngIf="formError" class="alert error">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMessage || 'contact.error_message' | translate }}
      </div>
      
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
        <div class="form-group">
          <label for="name">{{ 'contact.form.name' | translate }} *</label>
          <input 
            type="text" 
            id="name" 
            formControlName="name"
            [class.invalid]="contactForm.get('name')?.invalid && (contactForm.get('name')?.touched || formSubmitted)">
          <div class="error-message" *ngIf="contactForm.get('name')?.invalid && (contactForm.get('name')?.touched || formSubmitted)">
            {{ 'contact.errors.name_required' | translate }}
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">{{ 'contact.form.email' | translate }} *</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email"
            [class.invalid]="contactForm.get('email')?.invalid && (contactForm.get('email')?.touched || formSubmitted)">
          <div class="error-message" *ngIf="contactForm.get('email')?.invalid && (contactForm.get('email')?.touched || formSubmitted)">
            {{ getErrorMessage('email') | translate }}
          </div>
        </div>
        
        <div class="form-group">
          <label for="phone">{{ 'contact.form.phone' | translate }}</label>
          <input type="tel" id="phone" formControlName="phone">
        </div>
        
        <div class="form-group date-group">
          <div class="date-inputs">
            <div class="date-field">
              <label for="checkIn" class="sublabel">{{ 'contact.form.check_in' | translate }}</label>
              <div class="date-input-wrapper">
                <input 
                  type="text" 
                  id="checkIn" 
                  [value]="formatDate(checkInDate)"
                  (click)="showCalendar = true">
                <i class="fas fa-calendar-alt"></i>
              </div>
            </div>
            
            <div class="date-field">
              <label for="checkOut" class="sublabel">{{ 'contact.form.check_out' | translate }}</label>
              <div class="date-input-wrapper">
                <input 
                  type="text" 
                  id="checkOut" 
                  [value]="formatDate(checkOutDate)"
                  (click)="showCalendar = true">
                <i class="fas fa-calendar-alt"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="guests">{{ 'contact.form.guests' | translate }}</label>
          <div class="guests-input-wrapper">
            <input type="number" id="guests" formControlName="guests" min="1">
            <div class="guests-controls">
              <button type="button" class="guest-btn" (click)="decrementGuests()" [disabled]="contactForm.get('guests')?.value <= 1">
                <i class="fas fa-minus"></i>
              </button>
              <button type="button" class="guest-btn" (click)="incrementGuests()">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="message">{{ 'contact.form.message' | translate }} *</label>
          <textarea 
            id="message" 
            formControlName="message" 
            rows="5"
            [class.invalid]="contactForm.get('message')?.invalid && (contactForm.get('message')?.touched || formSubmitted)"></textarea>
          <div class="error-message" *ngIf="contactForm.get('message')?.invalid && (contactForm.get('message')?.touched || formSubmitted)">
            {{ 'contact.errors.message_required' | translate }}
          </div>
        </div>
        
        <div class="form-footer">
          <button type="submit" class="submit-button" [disabled]="isSubmitting">
            <span *ngIf="isSubmitting" class="spinner">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            <span *ngIf="!isSubmitting">
              {{ 'contact.form.submit' | translate }}
            </span>
          </button>
        </div>
      </form>
      
      <!-- Calendar Popup (now outside the form) -->
      <div *ngIf="showCalendar" class="calendar-overlay" (click)="closeCalendarOnOutsideClick($event)">
        <div class="calendar-popup calendar-popup-top">
          <div class="calendar-popup-header">
            <button type="button" class="close-btn" (click)="showCalendar = false">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <app-availability-calendar
            [selectedCheckIn]="checkInDate"
            [selectedCheckOut]="checkOutDate"
            (dateSelected)="onDateSelected($event)">
          </app-availability-calendar>
          
          <div class="calendar-popup-footer">
            <button type="button" class="btn-secondary" (click)="clearDates()">
            <i class="fas fa-trash"></i>
            </button>
            <button type="button" class="btn-primary" (click)="confirmDates()">
                        <i class="fas fa-thumbs-up"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-form-container {
      background-color: var(--color-bg-light, #f8f9fa);
      border-radius: var(--border-radius, 8px);
      padding: var(--spacing-xl, 2rem);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.05);
      position: relative;
    }
    
    .alert {
      padding: var(--spacing-md, 1rem);
      border-radius: var(--border-radius, 8px);
      margin-bottom: var(--spacing-lg, 1.5rem);
      display: flex;
      align-items: center;
      font-weight: 500;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .alert i {
      margin-right: var(--spacing-sm, 0.75rem);
      font-size: 1.2rem;
    }
    
    .alert.success {
      background-color: rgba(var(--color-success-rgb, 40, 167, 69), 0.1);
      color: var(--color-success, #28a745);
      border: 1px solid rgba(var(--color-success-rgb, 40, 167, 69), 0.2);
    }
    
    .alert.error {
      background-color: rgba(var(--color-danger-rgb, 220, 53, 69), 0.1);
      color: var(--color-danger, #dc3545);
      border: 1px solid rgba(var(--color-danger-rgb, 220, 53, 69), 0.2);
    }
    
    .contact-form .form-group {
      margin-bottom: var(--spacing-lg, 1.5rem);
    }
    
    .contact-form label {
      display: block;
      margin-bottom: var(--spacing-xs, 0.5rem);
      font-weight: 600;
      color: var(--color-primary, #343a40);
      font-size: 1rem;
    }
    
    .contact-form .sublabel {
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--color-secondary, #6c757d);
      margin-bottom: var(--spacing-xs, 0.5rem);
    }
    
    .contact-form input,
    .contact-form textarea {
      width: 100%;
      padding: var(--spacing-sm, 0.75rem) var(--spacing-md, 1rem);
      border: 1px solid var(--color-border, #dee2e6);
      border-radius: var(--border-radius, 8px);
      font-family: var(--font-family, sans-serif);
      font-size: 1rem;
      color: var(--color-text, #212529);
      background-color: white;
      transition: all 0.2s ease;
    }
    
    .contact-form input:focus,
    .contact-form textarea:focus {
      outline: none;
      border-color: var(--color-accent, #D4B254);
      box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb, 212, 178, 84), 0.25);
    }
    
    .contact-form input.invalid,
    .contact-form textarea.invalid {
      border-color: var(--color-danger, #dc3545);
      background-color: rgba(var(--color-danger-rgb, 220, 53, 69), 0.05);
    }
    
    .contact-form input.invalid:focus,
    .contact-form textarea.invalid:focus {
      box-shadow: 0 0 0 3px rgba(var(--color-danger-rgb, 220, 53, 69), 0.25);
    }
    
    .error-message {
      color: var(--color-danger, #dc3545);
      font-size: 0.85rem;
      margin-top: var(--spacing-xs, 0.5rem);
      font-weight: 500;
      display: flex;
      align-items: center;
    }
    
    .error-message::before {
      content: "⚠";
      margin-right: 0.5rem;
    }
    
    .date-inputs {
      display: flex;
      gap: var(--spacing-md, 1rem);
    }
    
    .date-field {
      flex: 1;
    }
    
    .date-input-wrapper {
      position: relative;
    }
    
    .date-input-wrapper i {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-secondary, #6c757d);
      pointer-events: none;
    }
    
    .date-input-wrapper input {
      cursor: pointer;
      padding-right: 40px;
    }
    
    .guests-input-wrapper {
      position: relative;
      display: flex;
    }
    
    .guests-input-wrapper input {
      padding-right: 80px;
    }
    
    .guests-controls {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .guest-btn {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: var(--color-bg-light, #f8f9fa);
      border-radius: 50%;
      cursor: pointer;
      color: var(--color-accent, #D4B254);
      transition: all 0.2s ease;
    }
    
    .guest-btn:hover {
      background-color: var(--color-accent, #D4B254);
      color: white;
    }
    
    .guest-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--color-bg-light, #f8f9fa);
      color: var(--color-secondary, #6c757d);
    }
    
    /* Calendar Overlay - Full screen backdrop */
    .calendar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease;
    }
    
    /* Calendar Popup - Now centered on screen */
    .calendar-popup {
      position: relative;
      width: 100%;
      max-width: 600px;
      background-color: white;
      border-radius: var(--border-radius, 8px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      z-index: 1001;
      padding: var(--spacing-lg, 1.5rem);
      animation: zoomIn 0.3s ease;
    }
    
    @keyframes zoomIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    
    .calendar-popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md, 1rem);
      padding-bottom: var(--spacing-sm, 0.75rem);
      border-bottom: 1px solid var(--color-border, #dee2e6);
    }
    
    .calendar-popup-header h4 {
      margin: 0;
      color: var(--color-primary, #343a40);
      font-size: 1.1rem;
    }
    
    .close-btn {
      background: none;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: var(--color-secondary, #6c757d);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .close-btn:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: var(--color-primary, #343a40);
    }
    
    .calendar-popup-footer {
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-sm, 0.75rem);
      margin-top: var(--spacing-md, 1rem);
      padding-top: var(--spacing-sm, 0.75rem);
      border-top: 1px solid var(--color-border, #dee2e6);
    }
    
    .btn-secondary {
      background-color: var(--color-bg-light, #f8f9fa);
      color: var(--color-secondary, #6c757d);
      border: 1px solid var(--color-border, #dee2e6);
      padding: var(--spacing-sm, 0.75rem) var(--spacing-md, 1rem);
      border-radius: var(--border-radius, 8px);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .btn-secondary:hover {
      background-color: var(--color-bg-light-hover, #e9ecef);
    }
    
    .btn-primary {
      background-color: var(--color-accent, #D4B254);
      color: white;
      border: none;
      padding: var(--spacing-sm, 0.75rem) var(--spacing-md, 1rem);
      border-radius: var(--border-radius, 8px);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .btn-primary:hover {
      background-color: var(--color-accent-dark, #c4a244);
    }
    
    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--spacing-xl, 2rem);
    }
    
    .submit-button {
      background-color: var(--color-accent, #D4B254);
      color: white;
      border: none;
      padding: var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);
      border-radius: var(--border-radius, 8px);
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 150px;
    }
    
    .submit-button:hover {
      background-color: var(--color-accent-dark, #c4a244);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(var(--color-accent-rgb, 212, 178, 84), 0.3);
    }
    
    .submit-button:active {
      transform: translateY(0);
    }
    
    .submit-button:disabled {
      background-color: var(--color-secondary, #6c757d);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    .spinner {
      margin-right: 8px;
    }
    
    @media (max-width: 768px) {
      .date-inputs {
        flex-direction: column;
        gap: var(--spacing-sm, 0.75rem);
      }
      
      .form-footer {
        flex-direction: column;
        gap: var(--spacing-md, 1rem);
        align-items: flex-start;
      }
      
      .submit-button {
        width: 100%;
      }
      
      .calendar-popup {
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
      }
    }
  `]
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  formSubmitted = false;
  formSuccess = false;
  formError = false;
  errorMessage = '';
  isSubmitting = false;
  showCalendar = false;
  
  // Temporary storage for calendar selection
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private availabilityChecker: AvailabilityCheckerService
  ) {}
  
  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      guests: [2, [Validators.min(1)]],
      message: ['', [Validators.required]]
    });
  }
  
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field) return '';
    
    if (field.hasError('required')) {
      return 'contact.errors.required';
    }
    
    if (field.hasError('email')) {
      return 'contact.errors.email';
    }
    
    return 'contact.errors.invalid';
  }
  
  onDateSelected(event: { checkIn: Date | null, checkOut: Date | null }) {
    this.checkInDate = event.checkIn;
    this.checkOutDate = event.checkOut;
  }
  
  clearDates() {
    this.checkInDate = null;
    this.checkOutDate = null;
  }
  
  confirmDates() {
    this.showCalendar = false;
  }
  
  formatDate(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleDateString();
  }
  
  incrementGuests() {
    const currentValue = this.contactForm.get('guests')?.value || 0;
    this.contactForm.patchValue({ guests: currentValue + 1 });
  }
  
  decrementGuests() {
    const currentValue = this.contactForm.get('guests')?.value || 0;
    if (currentValue > 1) {
      this.contactForm.patchValue({ guests: currentValue - 1 });
    }
  }
  
  closeCalendarOnOutsideClick(event: MouseEvent) {
    // Close the calendar if clicking outside the calendar popup
    if ((event.target as HTMLElement).className === 'calendar-overlay') {
      this.showCalendar = false;
    }
  }
  
  onSubmit() {
    this.formSubmitted = true;
    
    if (this.contactForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    
    // Check availability if dates are selected
    if (this.checkInDate && this.checkOutDate) {
      this.availabilityChecker.checkAvailability(this.checkInDate, this.checkOutDate)
        .subscribe({
          next: (isAvailable) => {
            if (!isAvailable) {
              this.isSubmitting = false;
              this.formError = true;
              this.errorMessage = 'Selected dates are not available. Please choose different dates.';
              return;
            }
            this.submitForm();
          },
          error: (error) => {
            console.error('Error checking availability:', error);
            // If there's an error checking availability, still try to submit
            this.submitForm();
          }
        });
    } else {
      // No dates selected, just submit the form
      this.submitForm();
    }
  }
  
  private submitForm() {
    const formData = {
      ...this.contactForm.value,
      checkIn: this.checkInDate ? this.formatDate(this.checkInDate) : null,
      checkOut: this.checkOutDate ? this.formatDate(this.checkOutDate) : null
    };
    
    // Replace with your form submission logic
    this.http.post('/api/contact', formData)
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.formSuccess = true;
          this.formError = false;
          this.contactForm.reset({ guests: 2 });
          this.checkInDate = null;
          this.checkOutDate = null;
          this.formSubmitted = false;
          
          // Reset form success message after 5 seconds
          setTimeout(() => {
            this.formSuccess = false;
          }, 5000);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.formError = true;
          this.formSuccess = false;
          this.errorMessage = error.message || 'Error submitting form. Please try again.';
          
          // Reset error message after 5 seconds
          setTimeout(() => {
            this.formError = false;
          }, 5000);
        }
      });
  }
}