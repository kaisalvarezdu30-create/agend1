import { CalendarView } from '@/types/calendar';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onAddEvent: () => void;
}

const VIEW_LABELS: Record<CalendarView, string> = {
  day: 'Jour',
  week: 'Semaine',
  month: 'Mois',
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onViewChange,
  onPrevious,
  onNext,
  onToday,
  onAddEvent,
}) => {
  const formatHeaderDate = () => {
    const year = currentDate.getFullYear();

    if (view === 'month') {
      const month = currentDate.toLocaleDateString('fr-FR', { month: 'long' });
      return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day;
      startOfWeek.setDate(diff);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const startMonth = startOfWeek.toLocaleDateString('fr-FR', { month: 'short' });
      const endMonth = endOfWeek.toLocaleDateString('fr-FR', { month: 'short' });

      if (startMonth === endMonth) {
        return `${startOfWeek.getDate()} – ${endOfWeek.getDate()} ${startMonth} ${year}`;
      }
      return `${startOfWeek.getDate()} ${startMonth} – ${endOfWeek.getDate()} ${endMonth} ${year}`;
    } else {
      const formatted = currentDate.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }
  };

  return (
    <header className="card-hero mb-6">
      {/* Decorative ball */}
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 text-[180px] opacity-10 select-none">⚽</div>
      <div className="absolute inset-0 pitch-stripes opacity-40" aria-hidden />

      <div className="relative">
        {/* Brand row */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-ball-gradient grid place-items-center shadow-glow-ball">
              <span className="text-2xl animate-bounce-soft">⚽</span>
            </div>
            <div className="leading-tight">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Kais Agenda</h1>
              <p className="text-xs sm:text-sm text-text-secondary">Ton planning foot &amp; école 🏆</p>
            </div>
          </div>
          <button onClick={onAddEvent} className="btn-ball hidden sm:inline-flex">
            <span className="text-lg">＋</span>
            <span>Nouveau</span>
          </button>
        </div>

        {/* Controls row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevious}
              aria-label="Précédent"
              className="w-10 h-10 grid place-items-center rounded-xl bg-card-2/70 hover:bg-card-2 border border-border transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={onNext}
              aria-label="Suivant"
              className="w-10 h-10 grid place-items-center rounded-xl bg-card-2/70 hover:bg-card-2 border border-border transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button onClick={onToday} className="btn-secondary text-sm">
              Aujourd&apos;hui
            </button>
            <h2 className="hidden md:block ml-3 text-lg font-bold text-white truncate">
              {formatHeaderDate()}
            </h2>
          </div>

          <h2 className="md:hidden text-lg font-bold text-white">{formatHeaderDate()}</h2>

          <div className="flex items-center bg-surface/80 border border-border rounded-2xl p-1 w-full sm:w-auto">
            {(['day', 'week', 'month'] as CalendarView[]).map((v) => (
              <button
                key={v}
                onClick={() => onViewChange(v)}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-sm font-semibold rounded-xl transition ${
                  view === v
                    ? 'bg-pitch-gradient text-white shadow-glow-pitch'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {VIEW_LABELS[v]}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile add button */}
        <button onClick={onAddEvent} className="btn-ball sm:hidden w-full mt-3">
          <span className="text-lg">＋</span>
          <span>Nouvel évènement</span>
        </button>
      </div>
    </header>
  );
};

export default CalendarHeader;
