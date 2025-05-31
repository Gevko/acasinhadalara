export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  message: string;
}