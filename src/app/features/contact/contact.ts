// src/app/features/contact/contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactFormData, EmailService } from '../../services/email/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  formSubmitted = false;
  formSuccess = false;
  formError = false;
  errorMessage = '';
  email = 'acasinhadalara@gmail.com';
  
  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private translateService: TranslateService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      checkIn: [''],
      checkOut: [''],
      guests: [''],
      message: ['', [Validators.required]]
    });
  }
  
  onSubmit() {
    this.formSubmitted = true;
    
    if (this.contactForm.valid) {
      const formData: ContactFormData = this.contactForm.value;
      
      this.emailService.sendContactForm(formData).subscribe(
        response => {
          if (response.success) {
            this.formSuccess = true;
            this.formError = false;
            this.contactForm.reset();
            this.formSubmitted = false;
          } else {
            this.formSuccess = false;
            this.formError = true;
            this.errorMessage = response.message;
          }
        },
        error => {
          this.formSuccess = false;
          this.formError = true;
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
          console.error('Error submitting form:', error);
        }
      );
    }
  }
  
  get today(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    
    if (!control || !control.errors || !control.touched) {
      return '';
    }
    
    if (control.errors['required']) {
      return this.translateService.instant('contact.errors.required');
    }
    
    if (control.errors['email']) {
      return this.translateService.instant('contact.errors.email');
    }
    
    return this.translateService.instant('contact.errors.invalid');
  }
}