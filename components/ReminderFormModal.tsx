import React, { useState, useEffect } from 'react';
import { Reminder } from '../types';
import { translations, Language } from '../translations';
import WheelPicker from './WheelPicker';

interface ReminderFormModalProps {
  isOpen: boolean;
  initialData: Reminder | null;
  language: Language;
  onClose: () => void;
  onSave: (reminder: Omit<Reminder, 'id' | 'history' | 'isEnabled'>) => void;
  onDelete: (id: string) => void;
}

const ICONS = ['', '🍼', '💊', '🎯', '💧', '🧸', '🛁', '🏃', '📚', '🦴', '🧘'];
const COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Orange', value: '#f59e0b' },
];

const DAY_OPTIONS = Array.from({ length: 32 }, (_, i) => i); // Up to 31 days
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => i);
const MINUTE_OPTIONS = Array.from({ length: 12 }, (_, i) => i * 5);

const ReminderFormModal: React.FC<ReminderFormModalProps> = ({ isOpen, initialData, language, onClose, onSave, onDelete }) => {
  const [label, setLabel] = useState('');
  const [icon, setIcon] = useState(ICONS[0]);
  const [selDays, setSelDays] = useState(0);
  const [selHours, setSelHours] = useState(3);
  const [selMinutes, setSelMinutes] = useState(0);
  const [color, setColor] = useState(COLORS[0].value);

  const t = translations[language];

  useEffect(() => {
    //if (!isOpen) return;
    
    if (initialData) {
      // Mode édition : charger les valeurs existantes
      setLabel(initialData.label);
      setIcon(initialData.icon);
      const totalHours = initialData.intervalHours;
      setSelDays(Math.floor(totalHours / 24));
      console.log('before',selHours)
      setSelHours(Math.floor(totalHours % 24));
      console.log('after',selHours)
      setSelMinutes(Math.round((totalHours % 1) * 60));
      setColor(initialData.color || COLORS[0].value);
    } else {
      // Mode création : valeurs par défaut
      setLabel('');
      setIcon(ICONS[1]);
      setSelDays(0);
      setSelHours(3);
      setSelMinutes(0);
      setColor(COLORS[0].value);
    }
  //}, [isOpen, initialData]);
  }, [selHours, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    const interval = (selDays * 24) + selHours + (selMinutes / 60);
    if (interval <= 0) return;
    
    onSave({
      label,
      icon,
      intervalHours: interval,
      lastCompletedTimestamp: initialData ? initialData.lastCompletedTimestamp : Date.now(),
      color
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {initialData ? t.editTask : t.addTask}
            </h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{t.name}</label>
              <input 
                type="text" 
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all text-lg font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{t.icon}</label>
              <div className="grid grid-cols-4 gap-2">
                {ICONS.map((i, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setIcon(i)}
                    className={`text-2xl p-2 rounded-xl transition-all h-12 flex items-center justify-center ${icon === i ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 hover:bg-slate-100'}`}
                  >
                    {i === '' ? <span className="text-[10px] font-bold text-slate-400">{t.none}</span> : i}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{t.interval}</label>
              <div className="flex justify-center gap-4">
                <WheelPicker 
                  label={t.days}
                  options={DAY_OPTIONS}
                  value={selDays}
                  onChange={setSelDays}
                />
                <WheelPicker 
                  label={t.hours}
                  options={HOUR_OPTIONS}
                  value={selHours}
                  onChange={setSelHours}
                />
                <WheelPicker 
                  label={t.minutes}
                  options={MINUTE_OPTIONS}
                  value={selMinutes}
                  onChange={setSelMinutes}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{t.icon}</label>
              <div className="flex gap-4">
                {COLORS.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${color === c.value ? 'ring-4 ring-offset-2 ring-slate-100 scale-110' : 'scale-90 opacity-60'}`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-blue-100 active:scale-95">
                {initialData ? t.save : t.create}
              </button>
              {initialData && (
                <button type="button" onClick={() => { if(confirm(t.confirmDelete)) { onDelete(initialData.id); onClose(); } }} className="w-full py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl">
                  {t.delete}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReminderFormModal;