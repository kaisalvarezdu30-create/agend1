'use client';

import { useState, useEffect } from 'react';
import { Event, CalendarView } from '@/types/calendar';
import { loadEvents, addEvent, updateEvent, deleteEvent } from '@/lib/localStorage';
import { addMonths, addDays } from '@/lib/dateUtils';
import CalendarHeader from '@/components/CalendarHeader';
import CalendarGrid from '@/components/CalendarGrid';
import DayView from '@/components/DayView';
import WeekView from '@/components/WeekView';
import EventModal from '@/components/EventModal';

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    const loadedEvents = loadEvents();
    setEvents(loadedEvents);
  }, []);

  const handlePrevious = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, -1));
    } else if (view === 'week') {
      setCurrentDate(addDays(currentDate, -7));
    } else {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setEditingEvent(event);
    setSelectedDate(null);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event: Event) => {
    if (editingEvent) {
      const updatedEvents = updateEvent(event);
      setEvents(updatedEvents);
    } else {
      const updatedEvents = addEvent(event);
      setEvents(updatedEvents);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = deleteEvent(eventId);
    setEvents(updatedEvents);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setEditingEvent(null);
  };

  const renderCalendarView = () => {
    switch (view) {
      case 'month':
        return (
          <CalendarGrid
            currentDate={currentDate}
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        );
      case 'week':
        return (
          <WeekView
            currentDate={currentDate}
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        );
      case 'day':
        return (
          <DayView
            currentDate={currentDate}
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        );
      default:
        return null;
    }
  };

  const handleAddEventClick = () => {
    setSelectedDate(new Date());
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const upcomingEvents = [...events]
    .filter((e) => new Date(`${e.date}T${e.endTime}`) >= new Date())
    .sort((a, b) => `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`))
    .slice(0, 3);

  return (
    <main className="min-h-screen p-3 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onViewChange={setView}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          onAddEvent={handleAddEventClick}
        />

        {/* Upcoming events strip */}
        {upcomingEvents.length > 0 && (
          <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {upcomingEvents.map((ev) => (
              <button
                key={ev.id}
                onClick={() => handleEventClick(ev)}
                className="card text-left hover:border-pitch transition group animate-pop"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl grid place-items-center text-xl event-${ev.color}`}>
                    {getCategoryEmoji(ev.category)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold truncate group-hover:text-pitch-light transition">{ev.title}</div>
                    <div className="text-xs text-text-secondary">
                      {formatPrettyDate(ev.date)} · {ev.startTime}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </section>
        )}

        <div className="animate-pop">{renderCalendarView()}</div>

        <footer className="mt-8 text-center text-xs text-text-secondary">
          ⚽ Fait pour Kais · Reste concentré, donne tout sur le terrain 🔥
        </footer>

        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          editingEvent={editingEvent}
          selectedDate={selectedDate}
        />
      </div>
    </main>
  );
}

function getCategoryEmoji(cat?: string) {
  switch (cat) {
    case 'match': return '⚽';
    case 'training': return '🏃';
    case 'school': return '📚';
    case 'fun': return '🎉';
    default: return '📌';
  }
}

function formatPrettyDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
}
