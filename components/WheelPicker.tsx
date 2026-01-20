
import React, { useRef, useEffect } from 'react';

interface WheelPickerProps {
  options: (number | string)[];
  value: number | string;
  onChange: (value: any) => void;
  label: string;
}

const WheelPicker: React.FC<WheelPickerProps> = ({ options, value, onChange, label }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemHeight = 40; // px

  useEffect(() => {
    const index = options.indexOf(value);
    if (scrollRef.current && index !== -1) {
      scrollRef.current.scrollTop = index * itemHeight;
    }
  }, [value, options]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollTop = scrollRef.current.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    if (options[index] !== undefined && options[index] !== value) {
      onChange(options[index]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-black uppercase text-slate-400 mb-1">{label}</span>
      <div className="relative h-32 w-20 overflow-hidden bg-slate-50 rounded-xl border border-slate-200">
        {/* Highlight Bar */}
        <div className="absolute top-1/2 left-0 w-full h-10 -translate-y-1/2 bg-blue-100/50 pointer-events-none border-y border-blue-200"></div>
        
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto scroll-smooth snap-y snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Spacer Top */}
          <div className="h-[44px]"></div>
          
          {options.map((opt) => (
            <div 
              key={opt}
              className={`h-10 flex items-center justify-center snap-center text-lg font-bold transition-colors ${value === opt ? 'text-blue-600' : 'text-slate-400'}`}
            >
              {opt}
            </div>
          ))}
          
          {/* Spacer Bottom */}
          <div className="h-[44px]"></div>
        </div>
      </div>
    </div>
  );
};

export default WheelPicker;
