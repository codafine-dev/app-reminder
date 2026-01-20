
import React from 'react';
import { Reminder } from '../types';
import { translations, Language } from '../translations';

interface HistoryModalProps {
  reminder: Reminder;
  language: Language;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ reminder, language, onClose }) => {
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{reminder.icon}</span>
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">{t.history}</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{reminder.label}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {reminder.history.length === 0 ? (
              <div className="py-12 text-center text-slate-400 italic">
                {t.historyEmpty}
              </div>
            ) : (
              reminder.history.map((ts, idx) => {
                const date = new Date(ts);
                return (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {reminder.history.length - idx}
                      </div>
                      <div>
                        <div className="text-slate-800 font-bold">
                          {date.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-slate-500 text-sm">
                          {date.toLocaleTimeString(language === 'zh' ? 'zh-CN' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    <span className="text-slate-300">✅</span>
                  </div>
                );
              })
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 mt-6 border-2 border-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-colors"
          >
            {t.back}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
