// src/app/features/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Highlight {
  value: string;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl:'./home.html',
  styleUrls: ['./home.scss']
})
export class HomePageComponent {
  features: Feature[] = [
    {
      icon: 'fas fa-bed',
      title: 'features.rooms',
      description: 'features.rooms_desc'
    },
    {
      icon: 'fas fa-swimming-pool',
      title: 'features.pool',
      description: 'features.pool_desc'
    },
    {
      icon: 'fas fa-hot-tub',
      title: 'features.jacuzzi',
      description: 'features.jacuzzi_desc'
    },
    {
      icon: 'fas fa-utensils',
      title: 'features.grill',
      description: 'features.grill_desc'
    },
    {
      icon: 'fas fa-champagne-glasses',
      title: 'features.party_basement',
      description: 'features.party_basement_desc'
    },
    {
      icon: 'fas fa-water',
      title: 'features.ocean_view',
      description: 'features.ocean_view_desc'
    },
        {
      icon: 'fas fa-square-parking',
      title: 'features.private_park',
      description: 'features.private_park_desc'
    }
  ];

  highlights: Highlight[] = [
    { value: '3', label: 'home.rooms_count' },
    {value: '6', label: 'home.bathroomws_count'},
    { value: '8-10', label: 'home.max_guests' },
    { value: '320m²', label: 'home.house_size' },
    { value: '650m²', label: 'home.garden_size' }
  ];

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
}