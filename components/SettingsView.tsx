import React from 'react';
import { Language, translations } from '../translations';

interface SettingsViewProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ language, onLanguageChange, onBack }) => {
  const t = translations[language];

  return (
    <div className="animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t.settings}</h2>
        <button 
          onClick={onBack}
          className="text-blue-600 font-bold flex items-center gap-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          {t.back}
        </button>
      </div>

      <div className="space-y-6">
        {/* Language Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            {t.language}
          </label>
          <div className="space-y-2">
            <button
              onClick={() => onLanguageChange('zh')}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${language === 'zh' ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-100 font-bold' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <span>{t.languageZh}</span>
              {language === 'zh' && <span>✅</span>}
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${language === 'en' ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-100 font-bold' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <span>{t.languageEn}</span>
              {language === 'en' && <span>✅</span>}
            </button>
            <button
              onClick={() => onLanguageChange('fr')}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${language === 'fr' ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-100 font-bold' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <span>{t.languageFr}</span>
              {language === 'fr' && <span>✅</span>}
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="p-6 text-center text-slate-300 text-xs font-bold uppercase tracking-widest leading-relaxed">
          MyAlarmApp v1.0.0<br/>
          Smart Interval Timer for Family Care
        </div>
      </div>
    </div>
  );
};

export default SettingsView;