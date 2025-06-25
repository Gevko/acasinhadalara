// src/app/pages/contact/contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContactFormComponent } from '../../features/email-submission/ui/contact-form/contact-form';
import { LocationComponent } from '../../widgets/location/location';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, ContactFormComponent, LocationComponent],
  templateUrl: 'contact.html',
  styleUrls: ['contact.scss']
})
export class ContactPageComponent {
  email = 'thehouseofgaeiras@gmail.com';
  phone = '+351 938 141 667';
  phone2 = '+351 910 855 609';
  address = 'Gaeiras, Óbidos, Portugal';
}