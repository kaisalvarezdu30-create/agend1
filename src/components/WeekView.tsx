import { Event } from '@/types/calendar';
import { getWeekDays, formatDate, formatTime } from '@/lib/dateUtils';
import EventCard from './EventCard';

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const weekDays = getWeekDays(currentDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekDaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDay = (date: Date) => {
    const dateStr = formatDate(date);
    return events
      .filter(event => event.date === dateStr)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

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
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="w-20"></div>
            {weekDays.map((date, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="text-sm font-medium text-text-secondary">
                  {weekDaysShort[index]}
                </div>
                <div className="text-lg font-bold text-text-primary">
                  {date.getDate()}
                </div>
                <button
                  onClick={() => onDateClick(date)}
                  className="mt-1 text-xs btn-primary px-2 py-1"
                >
                  Add
                </button>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 gap-2">
                {/* Time label */}
                <div className="w-20 text-sm text-text-secondary py-2">
                  {formatTime(`${hour.toString().padStart(2, '0')}:00`)}
                </div>
                
                {/* Day columns */}
                {weekDays.map((date, dayIndex) => {
                  const dayEvents = getEventsForDay(date);
                  const hourEvents = dayEvents.filter(event => {
                    const eventHour = parseInt(event.startTime.split(':')[0]);
                    return eventHour === hour;
                  });

                  return (
                    <div
                      key={dayIndex}
                      className="relative border-t border-gray-800 min-h-[60px]"
                    >
                      {hourEvents.map((event) => (
                        <div key={event.id} className="absolute inset-0 p-1">
                          <EventCard
                            event={event}
                            onClick={onEventClick}
                            compact={true}
                          />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* All day events */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="text-sm font-medium text-text-secondary mb-2">All day events:</div>
            {weekDays.map((date, dayIndex) => {
              const dayEvents = getEventsForDay(date);
              if (dayEvents.length === 0) return null;
              
              return (
                <div key={dayIndex} className="mb-2">
                  <div className="text-xs text-text-secondary mb-1">
                    {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onClick={onEventClick}
                        compact={true}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* No events message */}
      {weekDays.every(date => getEventsForDay(date).length === 0) && (
        <div className="text-center py-12 text-text-secondary">
          <p className="mb-4">No events scheduled for this week</p>
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

export default WeekView;
