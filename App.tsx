import React, { useState, useEffect, useCallback } from 'react';
import { Reminder } from './types';
import ReminderCard from './components/ReminderCard';
import ReminderFormModal from './components/ReminderFormModal';
import HistoryModal from './components/HistoryModal';
import SettingsView from './components/SettingsView';
import { translations, Language } from './translations';

const STORAGE_KEY = 'my_alarm_app_data_v5';
const LANG_KEY = 'my_alarm_app_lang';

const DEFAULT_REMINDERS: Reminder[] = [
  {
    id: '1',
    label: '喂奶',
    icon: '🍼',
    intervalHours: 3,
    lastCompletedTimestamp: Date.now() - (1000 * 60 * 60 * 2),
    history: [Date.now() - (1000 * 60 * 60 * 5)],
    color: '#3b82f6',
    isEnabled: true
  },
  {
    id: '2',
    label: '自己吃药',
    icon: '💊',
    intervalHours: 6,
    // Overdue by 20 minutes (Last completed 6h 20m ago)
    lastCompletedTimestamp: Date.now() - (1000 * 60 * (360 + 20)),
    history: [],
    color: '#ef4444',
    isEnabled: true
  },
  {
    id: '3',
    label: '宝宝维D',
    icon: '💧',
    intervalHours: 24,
    lastCompletedTimestamp: Date.now() - (1000 * 60 * 60 * 12),
    history: [],
    color: '#10b981',
    isEnabled: false
  }
];

const App: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [language, setLanguage] = useState<Language>('zh');
  const [view, setView] = useState<'list' | 'settings'>('list');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [viewingHistory, setViewingHistory] = useState<Reminder | null>(null);
  const [now, setNow] = useState(Date.now());
  const [modalKey, setModalKey] = useState(0); // Clé pour forcer la recréation du modal

  const t = translations[language];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedLang = localStorage.getItem(LANG_KEY) as Language;
    if (savedLang) setLanguage(savedLang);
    
    if (saved) {
      try {
        setReminders(JSON.parse(saved));
      } catch (e) {
        setReminders(DEFAULT_REMINDERS);
      }
    } else {
      setReminders(DEFAULT_REMINDERS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
  }, [language]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleComplete = useCallback((id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { 
        ...r, 
        lastCompletedTimestamp: Date.now(),
        history: [Date.now(), ...r.history].slice(0, 50)
      } : r
    ));
  }, []);

  const handleToggleEnabled = useCallback((id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, isEnabled: !r.isEnabled } : r
    ));
  }, []);

  const handleSaveReminder = (data: Omit<Reminder, 'id' | 'history' | 'isEnabled'>) => {
    if (editingReminder) {
      setReminders(prev => prev.map(r => 
        r.id === editingReminder.id ? { ...r, ...data } : r
      ));
    } else {
      const newReminder: Reminder = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        history: [],
        isEnabled: true
      };
      setReminders(prev => [...prev, newReminder]);
    }
    setIsFormOpen(false);
    setEditingReminder(null);
  };

  const handleDelete = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const openEdit = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setModalKey(prev => prev + 1); // Incrémenter la clé pour forcer la recréation
    setIsFormOpen(true);
  };

  const openNew = () => {
    setEditingReminder(null);
    setModalKey(prev => prev + 1); // Incrémenter la clé pour forcer la recréation
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingReminder(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <h1 
          className="text-xl font-bold text-slate-800 flex items-center gap-2 cursor-pointer"
          onClick={() => setView('list')}
        >
          <span className="text-blue-600">⏰</span> {t.title}
        </h1>
        <div className="flex items-center gap-2">
          {view === 'list' && (
            <button 
              onClick={openNew}
              className="bg-blue-600 text-white p-2 rounded-full shadow-lg shadow-blue-200 active:scale-90 transition-transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          )}
          <button 
            onClick={() => setView(v => v === 'list' ? 'settings' : 'list')}
            className={`p-2 rounded-full transition-colors ${view === 'settings' ? 'bg-slate-100 text-blue-600' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        {view === 'settings' ? (
          <SettingsView 
            language={language} 
            onLanguageChange={setLanguage} 
            onBack={() => setView('list')} 
          />
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            {reminders.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔭</div>
                <p className="text-slate-400">{t.noTasks}</p>
              </div>
            ) : (
              reminders.map(reminder => (
                <ReminderCard 
                  key={reminder.id} 
                  reminder={reminder} 
                  currentTime={now}
                  language={language}
                  onComplete={handleComplete}
                  onToggleEnabled={handleToggleEnabled}
                  onDelete={handleDelete}
                  onEdit={() => openEdit(reminder)}
                  onViewHistory={() => setViewingHistory(reminder)}
                />
              ))
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      <ReminderFormModal 
        key={modalKey} // ✅ KEY ajoutée ici pour forcer la recréation
        isOpen={isFormOpen} 
        initialData={editingReminder}
        language={language}
        onClose={closeForm}
        onSave={handleSaveReminder} 
        onDelete={handleDelete}
      />

      {viewingHistory && (
        <HistoryModal 
          reminder={viewingHistory} 
          language={language}
          onClose={() => setViewingHistory(null)} 
        />
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 px-6 py-4 flex justify-between items-center text-slate-500 text-sm z-20">
        <div className="flex flex-col items-start">
          <span className="font-bold text-slate-800 text-base">{reminders.length}</span>
          <span className="text-xs uppercase tracking-wider text-slate-400">{t.activeTasks}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-bold text-slate-800 text-base">
            {new Date().toLocaleTimeString(language === 'zh' ? 'zh-CN' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-xs uppercase tracking-wider text-slate-400">{t.currentTime}</span>
        </div>
      </footer>
    </div>
  );
};

export default App;