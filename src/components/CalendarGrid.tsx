import { Event } from '@/types/calendar';
import { getDaysInMonth, isSameDay, isToday, formatDate } from '@/lib/dateUtils';
import EventCard from './EventCard';

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDay = (date: Date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  const handleDateClick = (date: Date) => {
    onDateClick(date);
  };

  return (
    <div className="bg-card rounded-4xl shadow-lg p-6">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-text-secondary py-2"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isCurrentDay = isToday(date);
          const dayEvents = getEventsForDay(date);
          
          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              className={`min-h-24 p-2 border border-gray-800 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 ${
                !isCurrentMonth ? 'opacity-40' : ''
              } ${isCurrentDay ? 'bg-blue-900 border-blue-600' : 'bg-gray-900'}`}
            >
              <div className={`text-sm font-medium mb-1 ${
                isCurrentDay ? 'text-blue-400' : 'text-text-primary'
              }`}>
                {date.getDate()}
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={onEventClick}
                    compact={true}
                  />
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-text-secondary">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
