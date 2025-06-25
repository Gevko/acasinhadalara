// src/app/features/location/location.component.ts
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './events.html',
  styleUrls: ['./events.scss']
})
export class EventsPageComponent {

  constructor() {
  }

}