// src/app/features/location/location.component.ts
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './location.html',
  styleUrls: ['./location.scss']
})
export class LocationComponent {
  attractions = [
    {
      name: 'location.attractions.obidos.name',
      description: 'location.attractions.obidos.description',
      distance: 'location.attractions.obidos.distance',
      image: '/images/obidos-1.jpg'
    },
    {
      name: 'location.attractions.beach.name',
      description: 'location.attractions.beach.description',
      distance: 'location.attractions.beach.distance',
      image: '/images/beach-2.jpg'
    },
    {
      name: 'location.attractions.buddha.name',
      description: 'location.attractions.buddha.description',
      distance: 'location.attractions.buddha.distance',
      image: '/images/budha-1.jpg'
    },
    {
      name: 'location.attractions.lagoon.name',
      description: 'location.attractions.lagoon.description',
      distance: 'location.attractions.lagoon.distance',
      image: '/images/beach-1.jpg'
    }
  ];

  constructor() {
  }

}