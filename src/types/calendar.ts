export type EventColor = 'blue' | 'purple' | 'green' | 'orange';

export type CalendarView = 'day' | 'week' | 'month';

export interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  color: EventColor;
}

export interface CalendarState {
  currentDate: Date;
  view: CalendarView;
  events: Event[];
  selectedDate: Date | null;
  isModalOpen: boolean;
  editingEvent: Event | null;
}
