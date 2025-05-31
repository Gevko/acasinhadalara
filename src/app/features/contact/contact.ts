// src/app/features/contact/contact.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  formSubmitted = false;
  formSuccess = false;
  formError = false;
  errorMessage = '';
  isSubmitting = false;
  today = new Date().toISOString().split('T')[0]; // For date input min value
  email = 'test-geairas-house@gmail.com';
  
  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      checkIn: [''],
      checkOut: [''],
      guests: [''],
      message: ['', [Validators.required]],
      botField: [''] // Honeypot field for Netlify
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
  
  onSubmit() {
    this.formSubmitted = true;
    
    if (this.contactForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    
    // Create a FormData object to submit the form
    const formData = new FormData();
    Object.keys(this.contactForm.value).forEach(key => {
      if (this.contactForm.value[key] !== null && this.contactForm.value[key] !== undefined) {
        formData.append(key, this.contactForm.value[key]);
      }
    });
    
    // Add form-name field which is required by Netlify
    formData.append('form-name', 'contact');
    
    // Submit the form using fetch API
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString()
    })
    .then(response => {
      this.isSubmitting = false;
      if (response.ok) {
        this.formSuccess = true;
        this.formError = false;
        this.contactForm.reset();
        this.formSubmitted = false;
        
        // Reset form success message after 5 seconds
        setTimeout(() => {
          this.formSuccess = false;
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      this.isSubmitting = false;
      this.formError = true;
      this.formSuccess = false;
      this.errorMessage = error.message;
      console.error('Error submitting form:', error);
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        this.formError = false;
      }, 5000);
    });
  }
}