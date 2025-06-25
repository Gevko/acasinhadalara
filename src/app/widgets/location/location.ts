// src/app/features/location/location.component.ts
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-location-map',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './location.html',
  styleUrls: ['./location.scss']
})
export class LocationComponent {

  constructor() {
  }

}