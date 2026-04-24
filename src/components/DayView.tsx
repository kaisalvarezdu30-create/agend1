import { Event } from '@/types/calendar';
import { formatDate, formatTime } from '@/lib/dateUtils';
import EventCard from './EventCard';

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dateStr = formatDate(currentDate);
  const dayEvents = events
    .filter(event => event.date === dateStr)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const getEventPosition = (event: Event) => {
    const startHour = parseInt(event.startTime.split(':')[0]);
    const startMinute = parseInt(event.startTime.split(':')[1]);
    const endHour = parseInt(event.endTime.split(':')[0]);
    const endMinute = parseInt(event.endTime.split(':')[1]);
    
    const top = (startHour + startMinute / 60) * 60; // 60px per hour
    const height = ((endHour + endMinute / 60) - (startHour + startMinute / 60)) * 60;
    
    return { top, height };
  };

  const formatted = currentDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6 gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary capitalize truncate">
          {formatted}
        </h2>
        <button onClick={() => onDateClick(currentDate)} className="btn-primary text-sm">
          ＋ Ajouter
        </button>
      </div>

      {dayEvents.length === 0 ? (
        <div className="text-center py-14">
          <div className="text-6xl mb-3 animate-bounce-soft">⚽</div>
          <p className="text-text-secondary mb-4">Aucun évènement pour ce jour</p>
          <button onClick={() => onDateClick(currentDate)} className="btn-primary">
            Créer un évènement
          </button>
        </div>
      ) : (
        <div className="relative overflow-x-auto">
          <div className="flex min-w-[400px]">
            <div className="w-16 shrink-0 pr-2">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="text-xs text-text-secondary"
                  style={{ height: '60px' }}
                >
                  {formatTime(`${hour.toString().padStart(2, '0')}:00`)}
                </div>
              ))}
            </div>
            <div className="flex-1 relative">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="border-t border-border/50"
                  style={{ height: '60px' }}
                />
              ))}
              {dayEvents.map((event) => {
                const position = getEventPosition(event);
                return (
                  <div
                    key={event.id}
                    className="absolute left-0 right-0 mx-1"
                    style={{
                      top: `${position.top}px`,
                      height: `${position.height}px`,
                      minHeight: '36px',
                    }}
                  >
                    <EventCard event={event} onClick={onEventClick} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayView;
