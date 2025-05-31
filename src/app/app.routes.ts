// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'house',
    loadComponent: () => 
      import('./features/house-details/house-details').then(m => m.HouseDetailsComponent)
  },
  {
    path: 'gallery',
    loadComponent: () => 
      import('./features/gallery/gallery').then(m => m.GalleryComponent)
  },
  {
    path: 'location',
    loadComponent: () => 
      import('./features/location/location').then(m => m.LocationComponent)
  },
  {
    path: 'contact',
    loadComponent: () => 
      import('./features/contact/contact').then(m => m.ContactComponent)
  },
    {
    path: 'reviews',
    loadComponent: () => import('./features/reviews/reviews').then(c => c.ReviewsComponent)
  },
];