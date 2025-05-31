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
export class LocationComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  mapUrl: SafeResourceUrl;

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

  constructor(private sanitizer: DomSanitizer) {
    // Create a safe URL for the Google Maps embed
    // Coordinates for Gaeiras, Portugal
    const lat = 39.3635;
    const lng = -9.1574;

    // Create a safe URL with a place name instead of coordinates
    // This often works better with Google Maps Embed
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?q=Gaeiras,+Portugal&zoom=14&maptype=roadmap&language=en`
    );
  }

  ngAfterViewInit() {
    // Here we would normally initialize a map like Google Maps or Leaflet
    // For now, we'll just add a placeholder
    // const mapPlaceholder = document.createElement('div');
    // mapPlaceholder.className = 'map-placeholder';
    // mapPlaceholder.innerHTML = `
    //   <div class="map-content">
    //     <i class="fas fa-map-marker-alt"></i>
    //     <p>Geairas House, Gaeiras, Portugal</p>
    //   </div>
    // `;
    // this.mapContainer.nativeElement.appendChild(mapPlaceholder);
    // this.initMap();
  }

}