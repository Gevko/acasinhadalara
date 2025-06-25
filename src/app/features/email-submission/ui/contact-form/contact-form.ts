// src/app/features/contact-form/ui/contact-form/contact-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AvailabilityCalendarComponent } from '../availability-calendar/availability-calendar';
import { AvailabilityCheckerService } from '../../api/availability/availability.service';
import { ContactFormData, EmailService } from '../../api/email/email.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, AvailabilityCalendarComponent],
  templateUrl: 'contact-form.html',
  styleUrls: ['contact-form.scss']
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
    private emailService: EmailService,
    private availabilityChecker: AvailabilityCheckerService
  ) {}
  
  ngOnInit() {
this.contactForm = this.formBuilder.group({
  stayType: ['normal', [Validators.required]],
  name: ['', [Validators.required]],
  email: ['', [Validators.required, Validators.email]],
  phone: [''],
  guests: [2, [Validators.min(1)]],
  breakfast: ['yes'],
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
  
  async onSubmit() {
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
      await this.submitForm();
    }
  }

  
  private async submitForm() {
    const formData = {
      ...this.contactForm.value,
      checkIn: this.checkInDate ? this.formatDate(this.checkInDate) : null,
      checkOut: this.checkOutDate ? this.formatDate(this.checkOutDate) : null
    };
    
    const contactFormData = this.contactForm.value as ContactFormData;

    console.log('contactFormData', contactFormData)

    // Replace with your form submission logic
     await this.emailService.sendEmail(contactFormData).then((_) => {
       this.isSubmitting=false;
     }).catch((_e:any) => {
       //#todo: catch ex
     });
  }
}