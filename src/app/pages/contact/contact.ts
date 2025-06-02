// src/app/features/contact/contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContactFormComponent } from '../../features/email-submission/ui/contact-form/contact-form';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, ContactFormComponent],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactPageComponent {
  email = 'thehouseofgaeiras@gmail.com';
}