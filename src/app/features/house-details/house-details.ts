// src/app/features/house-details/house-details.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Room {
  name: string;
  description: string;
  features: string[];
  image: string;
}

interface Amenity {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './house-details.html',
  styleUrls: ['./house-details.scss']
})
export class HouseDetailsComponent {
  rooms: Room[] = [
    {
      name: 'house.master_bedroom',
      description: 'house.master_bedroom_desc',
      features: ['house.features.ensuite', 'house.features.king_bed', 'house.features.ocean_view'],
      image: 'assets/images/master-bedroom.jpg'
    },
    {
      name: 'house.second_bedroom',
      description: 'house.second_bedroom_desc',
      features: ['house.features.queen_bed', 'house.features.balcony'],
      image: 'assets/images/second-bedroom.jpg'
    },
    {
      name: 'house.third_bedroom',
      description: 'house.third_bedroom_desc',
      features: ['house.features.twin_beds', 'house.features.garden_view'],
      image: 'assets/images/third-bedroom.jpg'
    }
  ];

  amenities: Amenity[] = [
    { icon: 'fas fa-wifi', name: 'house.amenities.wifi' },
    { icon: 'fas fa-car', name: 'house.amenities.parking' },
    { icon: 'fas fa-snowflake', name: 'house.amenities.ac' },
    { icon: 'fas fa-tv', name: 'house.amenities.tv' },
    { icon: 'fas fa-washer', name: 'house.amenities.washer' },
    { icon: 'fas fa-utensils', name: 'house.amenities.kitchen' },
    { icon: 'fas fa-coffee', name: 'house.amenities.coffee' },
    { icon: 'fas fa-shower', name: 'house.amenities.shower' },
    { icon: 'fas fa-couch', name: 'house.amenities.living_room' },
    { icon: 'fas fa-umbrella-beach', name: 'house.amenities.beach_access' }
  ];
}