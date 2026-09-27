import React from "react";
import { ROAST_LEVELS, LANGUAGES } from "../config/app.config";
import { LanguageId, RoastLevel } from "../types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 font-mono text-sm w-full justify-between">
      <div className="flex flex-wrap items-center gap-6">
        {/* Language Select */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Language:</span>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
              className="appearance-none bg-white border-2 border-(--color-frame) pl-3 pr-8 py-1.5 font-bold cursor-pointer outline-none focus:border-(--color-accent) transition-colors"
            >
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>{l.label}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]">
              ▾
            </div>
          </div>
        </div>

        {/* Roast Level */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Roast Level:</span>
          <div className="flex gap-4">
            {ROAST_LEVELS.map((level) => (
              <label 
                key={level.id} 
                className="flex items-center gap-1.5 cursor-pointer group"
                title={level.description}
              >
                <div className="w-3.5 h-3.5 rounded-full border-2 border-(--color-frame) flex items-center justify-center p-0.5">
                  {roastLevel === level.id && (
                    <div className="w-full h-full bg-(--color-frame) rounded-full"></div>
                  )}
                </div>
                <span className={`font-bold text-xs uppercase ${roastLevel === level.id ? 'text-(--color-frame)' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {level.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Error Drawer Toggle */}
        <button
          onClick={onToggleErrorDrawer}
          className={`flex-1 md:flex-none whitespace-nowrap px-4 py-2 border-2 border-dashed font-bold text-xs uppercase transition-colors ${
            errorDrawerOpen 
              ? 'border-(--color-frame) bg-(--color-frame) text-white' 
              : 'border-gray-400 text-gray-500 hover:border-(--color-frame) hover:text-(--color-frame)'
          }`}
        >
          {errorDrawerOpen ? '− ERROR MESSAGE' : '+ ERROR MESSAGE'}
        </button>

        {/* Primary Action Button */}
        <button
          onClick={onRoast}
          disabled={isRoasting}
          className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-(--color-frame) text-white px-6 py-2 border-2 border-(--color-frame) font-bold transition-all disabled:opacity-80 hover:bg-black hover:shadow-[4px_4px_0px_0px_rgba(217,72,38,1)] disabled:hover:shadow-none min-w-[200px]"
        >
          {isRoasting ? (
            <span className="animate-pulse tracking-widest uppercase">ANALYZING...</span>
          ) : (
            <>
              <span className="tracking-wider uppercase">ROAST MY CODE</span>
              <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-sm tracking-tighter hidden sm:inline-block">Ctrl ⏎</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
