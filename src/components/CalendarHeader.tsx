import { CalendarView } from '@/types/calendar';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onViewChange,
  onPrevious,
  onNext,
  onToday,
}) => {
  const formatHeaderDate = () => {
    const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
    const year = currentDate.getFullYear();
    
    if (view === 'month') {
      return `${month} ${year}`;
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day;
      startOfWeek.setDate(diff);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short' });
      const startDay = startOfWeek.getDate();
      const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' });
      const endDay = endOfWeek.getDate();
      
      if (startMonth === endMonth) {
        return `${startMonth} ${startDay} - ${endDay}, ${year}`;
      } else {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
      }
    } else {
      return currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  return (
    <div className="bg-card shadow-lg rounded-4xl p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-text-primary">
            {formatHeaderDate()}
          </h1>
          <button
            onClick={onToday}
            className="btn-secondary text-sm px-3 py-1"
          >
            Today
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={onNext}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            aria-label="Next"
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => onViewChange('day')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              view === 'day' 
                ? 'bg-blue-600 text-white' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => onViewChange('week')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              view === 'week' 
                ? 'bg-blue-600 text-white' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => onViewChange('month')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              view === 'month' 
                ? 'bg-blue-600 text-white' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Month
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
