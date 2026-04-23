import { Event } from '@/types/calendar';

const STORAGE_KEY = 'calendar-events';

export const saveEvents = (events: Event[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }
};

export const loadEvents = (): Event[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
  }
  return [];
};

export const addEvent = (event: Event): Event[] => {
  const events = loadEvents();
  events.push(event);
  saveEvents(events);
  return events;
};

export const updateEvent = (updatedEvent: Event): Event[] => {
  const events = loadEvents();
  const index = events.findIndex(e => e.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
    saveEvents(events);
  }
  return events;
};

export const deleteEvent = (eventId: string): Event[] => {
  const events = loadEvents();
  const filteredEvents = events.filter(e => e.id !== eventId);
  saveEvents(filteredEvents);
  return filteredEvents;
};
