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

  return (
    <div className="bg-card rounded-4xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">
          {currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </h2>
        <button
          onClick={() => onDateClick(currentDate)}
          className="btn-primary text-sm px-3 py-1"
        >
          Add Event
        </button>
      </div>

      <div className="relative">
        <div className="flex">
          {/* Time labels */}
          <div className="w-20 pr-4">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-15 flex items-start text-sm text-text-secondary"
                style={{ height: '60px' }}
              >
                {formatTime(`${hour.toString().padStart(2, '0')}:00`)}
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="flex-1 relative">
            {/* Hour lines */}
            {hours.map((hour) => (
              <div
                key={hour}
                className="border-b border-gray-800"
                style={{ height: '60px' }}
              />
            ))}

            {/* Events */}
            {dayEvents.map((event) => {
              const position = getEventPosition(event);
              return (
                <div
                  key={event.id}
                  className="absolute left-0 right-0 mx-1"
                  style={{
                    top: `${position.top}px`,
                    height: `${position.height}px`,
                    minHeight: '30px'
                  }}
                >
                  <EventCard
                    event={event}
                    onClick={onEventClick}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {dayEvents.length === 0 && (
        <div className="text-center py-12 text-text-secondary">
          <p className="mb-4">No events scheduled for this day</p>
          <button
            onClick={() => onDateClick(currentDate)}
            className="btn-primary"
          >
            Create Event
          </button>
        </div>
      )}
    </div>
  );
};

export default DayView;
