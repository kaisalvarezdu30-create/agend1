export type EventColor = 'green' | 'orange' | 'blue' | 'purple' | 'red' | 'yellow';

export type EventCategory = 'match' | 'training' | 'school' | 'fun' | 'other';

export type CalendarView = 'day' | 'week' | 'month';

export interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  color: EventColor;
  category?: EventCategory;
  location?: string;
}

export const CATEGORY_META: Record<EventCategory, { emoji: string; label: string; color: EventColor }> = {
  match: { emoji: '⚽', label: 'Match', color: 'green' },
  training: { emoji: '🏃', label: 'Entraînement', color: 'orange' },
  school: { emoji: '📚', label: 'École', color: 'blue' },
  fun: { emoji: '🎉', label: 'Loisir', color: 'purple' },
  other: { emoji: '📌', label: 'Autre', color: 'yellow' },
};

export interface CalendarState {
  currentDate: Date;
  view: CalendarView;
  events: Event[];
  selectedDate: Date | null;
  isModalOpen: boolean;
  editingEvent: Event | null;
}
