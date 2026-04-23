import { Event } from '@/types/calendar';
import { formatTime } from '@/lib/dateUtils';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
  compact?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick, compact = false }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'event-blue';
      case 'purple':
        return 'event-purple';
      case 'green':
        return 'event-green';
      case 'orange':
        return 'event-orange';
      default:
        return 'event-blue';
    }
  };

  const handleClick = () => {
    onClick(event);
  };

  if (compact) {
    return (
      <div
        onClick={handleClick}
        className={`${getColorClasses(event.color)} text-xs px-2 py-1 rounded cursor-pointer hover:opacity-90 transition-opacity duration-200 truncate`}
        title={`${event.title} (${formatTime(event.startTime)} - ${formatTime(event.endTime)})`}
      >
        {event.title}
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`${getColorClasses(event.color)} p-3 rounded-lg cursor-pointer hover:opacity-90 transition-all duration-200 transform hover:scale-105`}
    >
      <div className="font-medium text-sm mb-1 truncate">{event.title}</div>
      <div className="text-xs opacity-90">
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </div>
    </div>
  );
};

export default EventCard;
