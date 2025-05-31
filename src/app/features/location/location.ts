// src/app/features/location/location.component.ts
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './location.html',
  styleUrls: ['./location.scss']
})
export class LocationComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  
  attractions = [
    {
      name: 'location.attractions.obidos.name',
      description: 'location.attractions.obidos.description',
      distance: 'location.attractions.obidos.distance',
      image: 'assets/images/location/obidos.jpg'
    },
    {
      name: 'location.attractions.beach.name',
      description: 'location.attractions.beach.description',
      distance: 'location.attractions.beach.distance',
      image: 'assets/images/location/beach.jpg'
    },
    {
      name: 'location.attractions.buddha.name',
      description: 'location.attractions.buddha.description',
      distance: 'location.attractions.buddha.distance',
      image: 'assets/images/location/buddha.jpg'
    },
    {
      name: 'location.attractions.lagoon.name',
      description: 'location.attractions.lagoon.description',
      distance: 'location.attractions.lagoon.distance',
      image: 'assets/images/location/lagoon.jpg'
    }
  ];
  
  ngAfterViewInit() {
    // Here we would normally initialize a map like Google Maps or Leaflet
    // For now, we'll just add a placeholder
    const mapPlaceholder = document.createElement('div');
    mapPlaceholder.className = 'map-placeholder';
    mapPlaceholder.innerHTML = `
      <div class="map-content">
        <i class="fas fa-map-marker-alt"></i>
        <p>Geairas House, Gaeiras, Portugal</p>
        <small>Map would be displayed here</small>
      </div>
    `;
    this.mapContainer.nativeElement.appendChild(mapPlaceholder);
  }
}