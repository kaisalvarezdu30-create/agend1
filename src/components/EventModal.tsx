import { useState, useEffect } from 'react';
import { CATEGORY_META, Event, EventCategory, EventColor } from '@/types/calendar';
import { formatDate } from '@/lib/dateUtils';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  onDelete?: (eventId: string) => void;
  editingEvent: Event | null;
  selectedDate: Date | null;
}

const CATEGORY_ORDER: EventCategory[] = ['match', 'training', 'school', 'fun', 'other'];

const COLOR_SWATCHES: { value: EventColor; className: string }[] = [
  { value: 'green', className: 'event-green' },
  { value: 'orange', className: 'event-orange' },
  { value: 'blue', className: 'event-blue' },
  { value: 'purple', className: 'event-purple' },
  { value: 'red', className: 'event-red' },
  { value: 'yellow', className: 'event-yellow' },
];

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  editingEvent,
  selectedDate,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('18:30');
  const [color, setColor] = useState<EventColor>('green');
  const [category, setCategory] = useState<EventCategory>('match');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setStartTime(editingEvent.startTime);
      setEndTime(editingEvent.endTime);
      setColor(editingEvent.color);
      setCategory(editingEvent.category ?? 'other');
      setLocation(editingEvent.location ?? '');
    } else {
      setDate(formatDate(selectedDate ?? new Date()));
      setTitle('');
      setStartTime('17:00');
      setEndTime('18:30');
      setCategory('match');
      setColor(CATEGORY_META['match'].color);
      setLocation('');
    }
  }, [editingEvent, selectedDate, isOpen]);

  const pickCategory = (cat: EventCategory) => {
    setCategory(cat);
    setColor(CATEGORY_META[cat].color);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    onSave({
      id: editingEvent?.id || Date.now().toString(),
      title: title.trim(),
      date,
      startTime,
      endTime,
      color,
      category,
      location: location.trim() || undefined,
    });
    onClose();
  };

  const handleDelete = () => {
    if (editingEvent && onDelete) {
      onDelete(editingEvent.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-pop"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border w-full sm:max-w-lg rounded-t-5xl sm:rounded-4xl shadow-2xl max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-hero-gradient p-5 sm:p-6 border-b border-border overflow-hidden">
          <div aria-hidden className="absolute -right-4 -top-4 text-7xl opacity-15 select-none">
            {CATEGORY_META[category].emoji}
          </div>
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-pitch-light">
                {editingEvent ? 'Modifier' : 'Nouveau'}
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {editingEvent ? 'Ton évènement' : 'Ajouter au planning'}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="w-9 h-9 grid place-items-center rounded-xl bg-surface/80 border border-border hover:bg-card-2 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* Category */}
          <div>
            <label className="label">Catégorie</label>
            <div className="grid grid-cols-5 gap-2">
              {CATEGORY_ORDER.map((cat) => {
                const meta = CATEGORY_META[cat];
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => pickCategory(cat)}
                    className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition ${
                      active
                        ? 'border-pitch bg-pitch/15 scale-105'
                        : 'border-border bg-surface hover:border-pitch/60'
                    }`}
                  >
                    <span className="text-2xl">{meta.emoji}</span>
                    <span className="text-[10px] sm:text-xs mt-1 font-semibold text-text-primary truncate max-w-full">
                      {meta.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="label">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder={category === 'match' ? 'Ex : PSG vs OM' : category === 'training' ? 'Ex : Entraînement club' : 'Nom de l\'évènement'}
              required
              autoFocus
            />
          </div>

          {/* Location */}
          <div>
            <label className="label">Lieu (optionnel)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
              placeholder="Ex : Stade municipal, École, Maison"
            />
          </div>

          {/* Date + time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-3">
              <label className="label">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input"
                required
              />
            </div>
            <div>
              <label className="label">Début</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input"
                required
              />
            </div>
            <div>
              <label className="label">Fin</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="input"
                required
              />
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="label">Couleur</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_SWATCHES.map((swatch) => (
                <button
                  key={swatch.value}
                  type="button"
                  onClick={() => setColor(swatch.value)}
                  aria-label={swatch.value}
                  className={`w-10 h-10 rounded-xl ${swatch.className} transition ${
                    color === swatch.value
                      ? 'ring-2 ring-white scale-110'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button type="submit" className="btn-primary flex-1">
              {editingEvent ? '💾 Enregistrer' : '✅ Créer'}
            </button>
            {editingEvent && onDelete && (
              <button type="button" onClick={handleDelete} className="btn-danger">
                🗑 Supprimer
              </button>
            )}
            <button type="button" onClick={onClose} className="btn-secondary">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
