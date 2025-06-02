// email.service.ts
import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly SERVICE_ID = 'service_ryh34pa';
  private readonly TEMPLATE_ID = 'template_mfillkc';
  private readonly PUBLIC_KEY = 'S4hZwaeIWSZ9Au-ao';

  constructor() {
    emailjs.init(this.PUBLIC_KEY);
  }

  async sendEmail(data: ContactFormData) {
    try {
      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          checkIn: data.checkIn || 'Not specified',
          checkOut: data.checkOut || 'Not specified',
          guests: data.guests || 'Not specified',
          message: data.message,
          to_name: 'thehouseofgaeiras@gmail.com',
          from_name: 'thehouseofgaeiras@gmail.com',
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}