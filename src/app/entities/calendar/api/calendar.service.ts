// src/app/entities/calendar/api/google-calendar.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CalendarEvent, DateRange } from '../model/calendar.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  // Your Google Calendar API endpoint with API key
  private readonly calendarId = environment.googleCalendarId;
  private readonly apiKey = environment.googleApiKey;
  private readonly baseUrl = 'https://www.googleapis.com/calendar/v3/calendars';

  constructor(private http: HttpClient) {}

  /**
   * Gets all booked dates within a range
   * @param start Start date
   * @param end End date
   * @returns Observable of calendar events
   */
  getBookedDates(start: Date, end: Date): Observable<CalendarEvent[]> {
    const url = `${this.baseUrl}/${encodeURIComponent(this.calendarId)}/events`;
    
    const params = {
      key: this.apiKey,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime'
    };

    return this.http.get<any>(url, { params }).pipe(
      map(response => {
        if (!response || !response.items) {
          return [];
        }
        
        return response.items.map((item: any) => ({
          id: item.id,
          title: item.summary || 'Booked',
          start: new Date(item.start.dateTime || item.start.date),
          end: new Date(item.end.dateTime || item.end.date)
        }));
      }),
      catchError(error => {
        console.error('Error fetching calendar events:', error);
        return of([]);
      })
    );
  }

  /**
   * Checks if a date range overlaps with any existing events
   * @param checkIn Start date
   * @param checkOut End date
   * @returns Observable boolean indicating if dates are available
   */
  checkAvailability(checkIn: Date, checkOut: Date): Observable<boolean> {
    return this.getBookedDates(checkIn, checkOut).pipe(
      map(events => events.length === 0)
    );
  }

  /**
   * Gets all booked date ranges for a specific month
   * @param year Year
   * @param month Month (0-11)
   * @returns Observable of date ranges
   */
  getMonthBookings(year: number, month: number): Observable<DateRange[]> {
    // Create start and end dates for the month
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    
    return this.getBookedDates(start, end).pipe(
      map(events => events.map(event => ({
        start: event.start,
        end: event.end
      })))
    );
  }
}