
import React, { useMemo, useState } from 'react';
import { Reminder } from '../types';
import { translations, Language } from '../translations';

interface ReminderCardProps {
  reminder: Reminder;
  currentTime: number;
  language: Language;
  onComplete: (id: string) => void;
  onToggleEnabled: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
  onViewHistory: () => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ 
  reminder, 
  currentTime, 
  language,
  onComplete, 
  onToggleEnabled,
  onDelete, 
  onEdit, 
  onViewHistory 
}) => {
  const { label, icon, intervalHours, lastCompletedTimestamp, color = '#3b82f6', isEnabled } = reminder;
  const [isCompleting, setIsCompleting] = useState(false);
  const t = translations[language];
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 70;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      if (confirm(t.confirmDelete)) {
        onDelete(reminder.id);
      }
    }
  };

  const formattedInterval = useMemo(() => {
    const d = Math.floor(intervalHours / 24);
    const h = Math.floor(intervalHours % 24);
    const m = Math.round((intervalHours % 1) * 60);
    
    const parts = [];
    if (d > 0) parts.push(`${d}${t.days}`);
    if (h > 0 || d === 0) parts.push(`${h}${t.hours}`);
    if (m > 0) parts.push(`${m}${t.minutes}`);
    return parts.join(' ');
  }, [intervalHours, t]);

  const stats = useMemo(() => {
    const totalMs = intervalHours * 60 * 60 * 1000;
    const elapsedMs = currentTime - lastCompletedTimestamp;
    const remainingMs = totalMs - elapsedMs;
    const isOverdue = remainingMs <= 0;
    const progress = Math.min(Math.max(elapsedMs / totalMs, 0), 1);
    
    const formatDuration = (ms: number) => {
      const absMs = Math.abs(ms);
      const h = Math.floor(absMs / (1000 * 60 * 60));
      const m = Math.floor((absMs % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((absMs % (1000 * 60)) / 1000);
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return {
      progress,
      isOverdue,
      remainingText: formatDuration(remainingMs),
      overdueText: formatDuration(elapsedMs - totalMs),
      lastCompletedText: new Date(lastCompletedTimestamp).toLocaleTimeString(language === 'zh' ? 'zh-CN' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };
  }, [currentTime, intervalHours, lastCompletedTimestamp, language]);

  const handleCompleteClick = () => {
    setIsCompleting(true);
    setTimeout(() => {
      onComplete(reminder.id);
      setIsCompleting(false);
    }, 600);
  };

  const borderStyle: React.CSSProperties = !isEnabled 
    ? { background: '#e2e8f0' } 
    : stats.isOverdue 
      ? {} 
      : {
          background: `conic-gradient(${color} ${stats.progress * 360}deg, #e2e8f0 0deg)`
        };

  return (
    <div 
      className={`relative p-1 rounded-2xl transition-all duration-500 shadow-sm ${stats.isOverdue && isEnabled ? 'animate-pulse-red border-4 border-red-500' : ''}`}
      style={borderStyle}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={`bg-white rounded-[calc(1rem-2px)] p-5 relative overflow-hidden transition-opacity ${!isEnabled ? 'opacity-60' : 'opacity-100'}`}>
        
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={isEnabled} onChange={() => onToggleEnabled(reminder.id)} />
            <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
          <div className="flex gap-1">
            <button onClick={onViewHistory} className="p-1.5 text-slate-300 hover:text-blue-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
            <button onClick={onEdit} className="p-1.5 text-slate-300 hover:text-orange-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
          </div>
        </div>

        <div className="flex items-start mb-2">
          <div className="flex items-center gap-4">
            {icon ? (
              <span className="text-4xl filter drop-shadow-sm">{icon}</span>
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            )}
            <div>
              <h3 className="font-bold text-slate-800 text-xl">{label}</h3>
              <div className={`text-sm font-semibold flex items-center gap-1.5 mt-0.5 ${!isEnabled ? 'text-slate-400' : stats.isOverdue ? 'text-red-600' : 'text-slate-500'}`}>
                {!isEnabled ? t.paused : (
                  <>
                    {stats.isOverdue && <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>}
                    {stats.isOverdue ? `${t.overdue}: +${stats.overdueText}` : `${t.remaining}: ${stats.remainingText}`}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleCompleteClick}
          disabled={isCompleting}
          className={`w-full py-5 mt-6 rounded-2xl text-white font-black text-2xl shadow-xl transform active:scale-95 transition-all flex items-center justify-center gap-3
            ${isEnabled && stats.isOverdue ? 'bg-red-500' : 'bg-blue-600'}`}
          style={{ backgroundColor: (isCompleting || (isEnabled && stats.isOverdue)) ? undefined : (isEnabled ? color : '#94a3b8') }}
        >
          {isCompleting ? <span className="animate-bounce">✅ {t.completed}</span> : t.done}
        </button>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between text-[11px] text-slate-400 font-bold uppercase tracking-widest">
          <div className="flex flex-col">
            <span className="text-slate-300 mb-0.5 text-[9px]">{t.lastCompleted}</span>
            <span className="text-slate-500">{stats.lastCompletedText}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-slate-300 mb-0.5 text-[9px]">{t.intervalSetting}</span>
            <span className="text-slate-500">{formattedInterval}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
