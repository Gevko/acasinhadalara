// src/app/entities/calendar/model/calendar.model.ts
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export interface DateRange {
  start: Date;
  end: Date;
}