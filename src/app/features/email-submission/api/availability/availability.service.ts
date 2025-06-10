// src/app/features/contact-form/model/availability-checker.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarService } from '../../../../entities/calendar/api/calendar.service';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityCheckerService {
  constructor(private googleCalendarService: CalendarService) {}

  /**
   * Checks if the requested dates are available
   */
  checkAvailability(checkIn: Date, checkOut: Date): Observable<boolean> {
    return this.googleCalendarService.checkAvailability(checkIn, checkOut);
  }

  /**
   * Gets all booked date ranges for a specific month
   */
  getMonthBookings(year: number, month: number): Observable<{start: Date, end: Date}[]> {
    return this.googleCalendarService.getMonthBookings(year, month);
  }
}