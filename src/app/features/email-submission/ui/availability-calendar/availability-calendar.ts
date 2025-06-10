// src/app/features/contact-form/ui/availability-calendar/availability-calendar.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailabilityCheckerService } from '../../api/availability/availability.service';

interface CalendarDay {
  date: Date;
  otherMonth: boolean;
  booked: boolean;
}

@Component({
  selector: 'app-availability-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="availability-calendar">
      <div *ngIf="loading" class="calendar-loading">
        <i class="fas fa-spinner fa-spin"></i> Loading availability...
      </div>
      
      <div *ngIf="!loading" class="calendar-wrapper">
        <div class="calendar-header">
          <button type="button" (click)="prevMonth()" class="calendar-nav-btn">
            <i class="fas fa-chevron-left"></i>
          </button>
          <h3>{{ currentMonthName }} {{ currentYear }}</h3>
          <button type="button" (click)="nextMonth()" class="calendar-nav-btn">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div class="calendar-days">
          <div class="day-name" *ngFor="let day of dayNames">{{ day }}</div>
          
          <div 
            *ngFor="let day of calendarDays" 
            class="calendar-day"
            [class.other-month]="day.otherMonth"
            [class.booked]="day.booked"
            [class.selected]="isDateSelected(day.date)"
            [class.in-range]="isDateInRange(day.date)"
            [class.disabled]="day.booked || isPastDate(day.date)"
            (click)="selectDate(day)">
            {{ day.date.getDate() }}
            <div *ngIf="day.booked" class="booked-indicator"></div>
          </div>
        </div>
        
        <div class="calendar-legend">
          <div class="legend-item">
            <div class="legend-color available"></div>
            <span>Available</span>
          </div>
          <div class="legend-item">
            <div class="legend-color booked"></div>
            <span>Booked</span>
          </div>
          <div class="legend-item">
            <div class="legend-color selected"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .availability-calendar {
      font-family: var(--font-family);
    }
    
    .calendar-loading {
      text-align: center;
      padding: 2rem;
      color: var(--color-secondary);
    }
    
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .calendar-header h3 {
      margin: 0;
      font-size: 1.2rem;
      color: var(--color-primary);
    }
    
    .calendar-nav-btn {
      background: none;
      border: none;
      color: var(--color-accent);
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0.5rem;
    }
    
    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.25rem;
    }
    
    .day-name {
      text-align: center;
      font-weight: 500;
      color: var(--color-secondary);
      padding: 0.5rem 0;
      font-size: 0.9rem;
    }
    
    .calendar-day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      border-radius: 50%;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }
    
    .calendar-day:hover:not(.booked):not(.disabled) {
      background-color: rgba(var(--color-accent-rgb), 0.1);
    }
    
    .calendar-day.other-month {
      color: var(--color-text-light);
    }
    
    .calendar-day.booked {
      background-color: #f8d7da;
      color: #721c24;
      cursor: not-allowed;
    }
    
    .calendar-day.selected {
      background-color: var(--color-accent);
      color: white;
    }
    
    .calendar-day.in-range {
      background-color: rgba(var(--color-accent-rgb), 0.2);
    }
    
    .calendar-day.disabled {
      color: var(--color-text-light);
      cursor: not-allowed;
      background-color: #f0f0f0;
    }
    
    .booked-indicator {
      position: absolute;
      bottom: 3px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #721c24;
    }
    
    .calendar-legend {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
      gap: 1rem;
      font-size: 0.8rem;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
    }
    
    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 0.25rem;
    }
    
    .legend-color.available {
      border: 1px solid #ddd;
    }
    
    .legend-color.booked {
      background-color: #f8d7da;
    }
    
    .legend-color.selected {
      background-color: var(--color-accent);
    }
  `]
})
export class AvailabilityCalendarComponent implements OnInit {
  @Input() selectedCheckIn: Date | null = null;
  @Input() selectedCheckOut: Date | null = null;
  
  @Output() dateSelected = new EventEmitter<{ checkIn: Date | null, checkOut: Date | null }>();
  
  loading = true;
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  calendarDays: CalendarDay[] = [];
  bookedRanges: {start: Date, end: Date}[] = [];
  
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  constructor(private availabilityChecker: AvailabilityCheckerService) {}
  
  get currentMonthName(): string {
    return new Date(this.currentYear, this.currentMonth, 1).toLocaleString('default', { month: 'long' });
  }
  
  ngOnInit() {
    this.loadCalendarData();
  }
  
  loadCalendarData() {
    this.loading = true;
    
    this.availabilityChecker.getMonthBookings(this.currentYear, this.currentMonth)
      .subscribe({
        next: (bookings: unknown) => {
          this.bookedRanges = bookings as {start: Date, end: Date}[];
          this.generateCalendarDays();
          this.loading = false;
        },
        error: (error:string) => {
          console.error('Error loading calendar data:', error);
          this.loading = false;
          // Still generate calendar days even if API fails
          this.generateCalendarDays();
        }
      });
  }
  
  generateCalendarDays() {
    this.calendarDays = [];
    
    // Get the first day of the month
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    // Get the last day of the month
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    
    // Get the day of the week for the first day (0-6, where 0 is Sunday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Add days from previous month to fill the first week
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay - i);
      this.calendarDays.push({
        date,
        otherMonth: true,
        booked: this.isDateBooked(date)
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      this.calendarDays.push({
        date,
        otherMonth: false,
        booked: this.isDateBooked(date)
      });
    }
    
    // Add days from next month to fill the last week
    const lastDayOfWeek = lastDay.getDay();
    const daysToAdd = 6 - lastDayOfWeek;
    for (let i = 1; i <= daysToAdd; i++) {
      const date = new Date(this.currentYear, this.currentMonth + 1, i);
      this.calendarDays.push({
        date,
        otherMonth: true,
        booked: this.isDateBooked(date)
      });
    }
  }
  
  isDateBooked(date: Date): boolean {
    // Check if date is in any booked range
    const dateTime = date.getTime();
    return this.bookedRanges.some(range => {
      const startTime = range.start.getTime();
      const endTime = range.end.getTime();
      return dateTime >= startTime && dateTime < endTime;
    });
  }
  
  isPastDate(date: Date): boolean {
    // Set hours to 0 for both dates to compare just the dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  }
  
  isDateSelected(date: Date): boolean {
    if (!this.selectedCheckIn && !this.selectedCheckOut) return false;
    
    const dateTime = date.getTime();
    const checkInTime = this.selectedCheckIn ? this.selectedCheckIn.getTime() : null;
    const checkOutTime = this.selectedCheckOut ? this.selectedCheckOut.getTime() : null;
    
    return (checkInTime === dateTime) || (checkOutTime === dateTime);
  }
  
  isDateInRange(date: Date): boolean {
    if (!this.selectedCheckIn || !this.selectedCheckOut) return false;
    
    const dateTime = date.getTime();
    return dateTime > this.selectedCheckIn.getTime() && dateTime < this.selectedCheckOut.getTime();
  }
  
  selectDate(day: CalendarDay) {
    if (day.booked || this.isPastDate(day.date)) return; // Can't select booked or past dates
    
    const selectedDate = new Date(day.date);
    
    if (!this.selectedCheckIn || (this.selectedCheckIn && this.selectedCheckOut)) {
      // Start a new selection
      this.selectedCheckIn = selectedDate;
      this.selectedCheckOut = null;
    } else {
      // Complete the selection
      if (selectedDate < this.selectedCheckIn) {
        // If selecting a date before check-in, swap them
        this.selectedCheckOut = this.selectedCheckIn;
        this.selectedCheckIn = selectedDate;
      } else {
        this.selectedCheckOut = selectedDate;
      }
      
      // Check if any date in the range is booked
      if (this.isRangeBooked()) {
        alert('Your selected date range includes booked dates. Please select a different range.');
        return;
      }
    }
    
    this.dateSelected.emit({
      checkIn: this.selectedCheckIn,
      checkOut: this.selectedCheckOut
    });
  }
  
  isRangeBooked(): boolean {
    if (!this.selectedCheckIn || !this.selectedCheckOut) return false;
    
    const currentDate = new Date(this.selectedCheckIn);
    while (currentDate <= this.selectedCheckOut) {
      if (this.isDateBooked(currentDate)) {
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false;
  }
  
  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.loadCalendarData();
  }
  
  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.loadCalendarData();
  }
}