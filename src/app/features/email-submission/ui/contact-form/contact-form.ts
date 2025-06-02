import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ContactFormData, EmailService } from '../../api/email/email.service';

@Component({
  selector: 'app-contact-form',
  imports: [TranslateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  formSubmitted = false;
  formSuccess = false;
  formError = false;
  errorMessage = '';
  isSubmitting = false;
  today = new Date().toISOString().split('T')[0];

    constructor(private formBuilder: FormBuilder, private readonly emailService: EmailService) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      checkIn: [''],
      checkOut: [''],
      guests: [''],
      message: [''],
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
