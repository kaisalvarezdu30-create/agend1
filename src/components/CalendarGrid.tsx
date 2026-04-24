import { Event } from '@/types/calendar';
import { getDaysInMonth, isToday, formatDate } from '@/lib/dateUtils';
import EventCard from './EventCard';

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const WEEKDAYS_FULL = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const WEEKDAYS_SHORT = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const days = getDaysInMonth(currentDate);

  const getEventsForDay = (date: Date) => {
    const dateStr = formatDate(date);
    return events
      .filter((event) => event.date === dateStr)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="card">
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {WEEKDAYS_FULL.map((day, i) => (
          <div
            key={day}
            className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-text-secondary py-2"
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{WEEKDAYS_SHORT[i]}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isCurrentDay = isToday(date);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const dayEvents = getEventsForDay(date);
          const maxVisible = 2;

          return (
            <button
              key={index}
              onClick={() => onDateClick(date)}
              className={`min-h-[72px] sm:min-h-[110px] p-1.5 sm:p-2 border rounded-xl sm:rounded-2xl cursor-pointer transition text-left flex flex-col ${
                isCurrentDay
                  ? 'bg-pitch/15 border-pitch shadow-glow-pitch'
                  : isWeekend
                  ? 'bg-surface/60 border-border hover:border-pitch/50'
                  : 'bg-surface border-border hover:border-pitch/50'
              } ${!isCurrentMonth ? 'opacity-40' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs sm:text-sm font-bold ${
                    isCurrentDay
                      ? 'text-white bg-pitch-gradient rounded-full w-6 h-6 sm:w-7 sm:h-7 grid place-items-center shadow-glow-pitch'
                      : 'text-text-primary px-1'
                  }`}
                >
                  {date.getDate()}
                </span>
                {dayEvents.length > 0 && (
                  <span className="hidden sm:inline text-[10px] font-semibold text-text-secondary">
                    {dayEvents.length}
                  </span>
                )}
              </div>

              <div className="space-y-1 flex-1">
                {dayEvents.slice(0, maxVisible).map((event) => (
                  <EventCard key={event.id} event={event} onClick={onEventClick} compact />
                ))}
                {dayEvents.length > maxVisible && (
                  <div className="text-[10px] sm:text-xs font-semibold text-pitch-light">
                    +{dayEvents.length - maxVisible}
                  </div>
                )}
                {/* Mobile: dots if many events */}
                {dayEvents.length > 0 && (
                  <div className="sm:hidden flex gap-0.5 mt-auto">
                    {dayEvents.slice(0, 3).map((e) => (
                      <span
                        key={e.id}
                        className={`w-1.5 h-1.5 rounded-full event-${e.color}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
