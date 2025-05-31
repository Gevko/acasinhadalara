// src/app/features/house-details/house-details.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ImageViewerComponent } from '../../widgets/image-viewer';

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

interface ImageGroup {
  images: string[];
  alts: string[];
}

@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, ImageViewerComponent],
  templateUrl: './house-details.html',
  styleUrls: ['./house-details.scss']
})
export class HouseDetailsComponent {
  activeTab: string = 'second';
  
  // Image viewer properties
  viewerOpen: boolean = false;
  viewerImages: string[] = [];
  viewerAlts: string[] = [];
  viewerCurrentIndex: number = 0;
  
  // Image groups for different sections
  mainSalonImages: ImageGroup = {
    images: ['/images/salon-1.jpg', '/images/salon-2.jpg', '/images/salon-3.jpg'],
    alts: ['Main Salon', 'Main Salon Area', 'Main Salon View']
  };
  
  secondLivingImages: ImageGroup = {
    images: ['/images/living-1.jpg', '/images/living-2.jpg', '/images/living-3.jpg', '/images/living-4.jpg'],
    alts: ['Second Living Room', 'Second Living Area', 'Second Living View', 'Second Living Detail']
  };
  
  poolImages: ImageGroup = {
    images: ['/images/pool-2.jpg', '/images/pool-1.jpg', '/images/pool-table.jpg'],
    alts: ['Swimming Pool', 'Pool View', 'Table Near Pool']
  };
  
  masterRoomImages: ImageGroup = {
    images: ['/images/master-1.jpg', '/images/master-bathroom.jpg'],
    alts: ['Master Bedroom', 'Master Bathroom']
  };
  
  otherRoomsImages: ImageGroup = {
    images: ['/images/bedroom-3.jpg', '/images/bedroom-2.jpg', '/images/shared-bathroom.jpg'],
    alts: ['Second Bedroom', 'Third Bedroom', 'Shared Bathroom']
  };
  
  exteriorImages: ImageGroup = {
    images: ['/images/jacuzzi-2.jpg', '/images/bbq-1.jpg', '/images/exterior-2.jpg'],
    alts: ['Jacuzzi', 'BBQ Area', 'Garden']
  };
  
  masterRoom = {
    name: 'house.master_bedroom',
    description: 'house.master_bedroom_desc',
    features: ['house.features.ensuite', 'house.features.king_bed', 'house.features.ocean_view'],
    image: '/images/master-1.jpg',
    bathroomImage: '/images/master-bathroom.jpg'
  };
  
  otherRooms = [
    {
      name: 'house.second_bedroom',
      description: 'house.second_bedroom_desc',
      features: ['house.features.queen_bed', 'house.features.balcony'],
      image: '/images/bedroom-3.jpg'
    },
    {
      name: 'house.third_bedroom',
      description: 'house.third_bedroom_desc',
      features: ['house.features.twin_beds', 'house.features.garden_view'],
      image: '/images/bedroom-2.jpg'
    }
  ];
  
  // Keep this for backward compatibility with existing code
  rooms: Room[] = [
    {
      name: 'house.master_bedroom',
      description: 'house.master_bedroom_desc',
      features: ['house.features.ensuite', 'house.features.king_bed', 'house.features.ocean_view'],
      image: '/images/master-1.jpg'
    },
    {
      name: 'house.second_bedroom',
      description: 'house.second_bedroom_desc',
      features: ['house.features.queen_bed', 'house.features.balcony'],
      image: '/images/bedroom-3.jpg'
    },
    {
      name: 'house.third_bedroom',
      description: 'house.third_bedroom_desc',
      features: ['house.features.twin_beds', 'house.features.garden_view'],
      image: '/images/bedroom-2.jpg'
    }
  ];

  amenities: Amenity[] = [
    { icon: 'fas fa-wifi', name: 'house.amenities.wifi' },
    { icon: 'fas fa-car', name: 'house.amenities.parking' },
    { icon: 'fas fa-tv', name: 'house.amenities.tv' },
    { icon: 'fas fa-soap', name: 'house.amenities.washer' },
    { icon: 'fas fa-utensils', name: 'house.amenities.kitchen' },
    { icon: 'fas fa-coffee', name: 'house.amenities.coffee' },
    { icon: 'fas fa-shower', name: 'house.amenities.shower' },
    { icon: 'fas fa-couch', name: 'house.amenities.living_room' },
    { icon: 'fas fa-umbrella-beach', name: 'house.amenities.beach_access' }
  ];
  
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  
  // Image viewer methods
  openImageViewer(imageGroup: ImageGroup, index: number): void {
    this.viewerImages = imageGroup.images;
    this.viewerAlts = imageGroup.alts;
    this.viewerCurrentIndex = index;
    this.viewerOpen = true;
    
    // Prevent body scrolling when viewer is open
    document.body.style.overflow = 'hidden';
  }
  
  closeImageViewer(): void {
    this.viewerOpen = false;
    
    // Restore body scrolling
    document.body.style.overflow = '';
  }
}