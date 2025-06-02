// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/home/home').then(m => m.HomePageComponent)
  },
  {
    path: 'house',
    loadComponent: () => 
      import('./pages/house-details/house-details').then(m => m.HouseDetailsPageComponent)
  },
  {
    path: 'gallery',
    loadComponent: () => 
      import('./pages/gallery/gallery').then(m => m.GalleryPageComponent)
  },
  {
    path: 'location',
    loadComponent: () => 
      import('./pages/location/location').then(m => m.LocationPageComponent)
  },
  {
    path: 'contact',
    loadComponent: () => 
      import('./pages/contact/contact').then(m => m.ContactPageComponent)
  },
    {
    path: 'reviews',
    loadComponent: () => import('./pages/reviews/reviews').then(c => c.ReviewsPageComponent)
  },
];