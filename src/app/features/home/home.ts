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
export class HomeComponent {
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
      icon: 'fas fa-water',
      title: 'features.ocean_view',
      description: 'features.ocean_view_desc'
    }
  ];

  highlights: Highlight[] = [
    { value: '3', label: 'home.rooms_count' },
    { value: '8', label: 'home.max_guests' },
    { value: '200m²', label: 'home.house_size' },
    { value: '500m²', label: 'home.garden_size' }
  ];
}