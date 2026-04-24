import { CATEGORY_META, Event, EventColor } from '@/types/calendar';
import { formatTime } from '@/lib/dateUtils';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
  compact?: boolean;
}

const COLOR_CLASSES: Record<EventColor, string> = {
  green: 'event-green',
  orange: 'event-orange',
  blue: 'event-blue',
  purple: 'event-purple',
  red: 'event-red',
  yellow: 'event-yellow',
};

const EventCard: React.FC<EventCardProps> = ({ event, onClick, compact = false }) => {
  const colorClass = COLOR_CLASSES[event.color] ?? 'event-green';
  const emoji = event.category ? CATEGORY_META[event.category].emoji : '📌';
  const handleClick = () => onClick(event);

  if (compact) {
    return (
      <button
        onClick={handleClick}
        className={`${colorClass} w-full text-left text-[11px] sm:text-xs px-2 py-1 rounded-lg font-semibold cursor-pointer hover:brightness-110 active:scale-95 transition shadow-soft truncate flex items-center gap-1`}
        title={`${event.title} (${formatTime(event.startTime)} - ${formatTime(event.endTime)})`}
      >
        <span className="shrink-0">{emoji}</span>
        <span className="truncate">{event.title}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${colorClass} w-full text-left p-3 rounded-2xl cursor-pointer hover:brightness-110 active:scale-[0.98] transition shadow-soft`}
    >
      <div className="flex items-start gap-2">
        <div className="text-xl leading-none">{emoji}</div>
        <div className="min-w-0 flex-1">
          <div className="font-bold text-sm mb-0.5 truncate">{event.title}</div>
          <div className="text-xs opacity-90">
            {formatTime(event.startTime)} – {formatTime(event.endTime)}
            {event.location ? ` · ${event.location}` : ''}
          </div>
        </div>
      </div>
    </button>
  );
};

export default EventCard;
