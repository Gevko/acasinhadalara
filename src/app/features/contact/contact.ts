// src/app/features/contact/contact.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../../services/email/email.service';
import { ContactFormData } from '../../entities/contact-form-data.dto';

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
  email = 'thehouseofgaeiras@gmail.com';
  
  constructor(private formBuilder: FormBuilder, private readonly emailService: EmailService) {}
  
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
  
  async onSubmit() {
    this.formSubmitted = true;
    
    if (this.contactForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    
    // Create a FormData object to submit the form

    const contactFormData = this.contactForm.value as ContactFormData;
    
    await this.emailService.sendEmail(contactFormData).then((_) => {
      this.isSubmitting=false;
    }).catch((_e:any) => {
      //#todo: catch ex
    });
  }
}