"use client";
import React, { useRef, useState } from "react";
import { LANGUAGES } from "../config/app.config";
import { LanguageId } from "../types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({ code, onChange, language, errorLine, onLoadSample }: CodeEditorProps) {
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const langLabel = LANGUAGES.find((l) => l.id === language)?.label || language;
  const lineCount = Math.max(code.split("\n").length, 10);
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const updateCursorPos = (element: HTMLTextAreaElement) => {
    const textBeforeCursor = element.value.substring(0, element.selectionStart);
    const linesBeforeCursor = textBeforeCursor.split("\n");
    setCursorPos({
      line: linesBeforeCursor.length,
      col: linesBeforeCursor[linesBeforeCursor.length - 1].length + 1,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = target.value.substring(0, start) + "    " + target.value.substring(end);
      onChange(newValue);
      
      // Need a slight delay to allow react state to update before we set selection
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
          updateCursorPos(textareaRef.current);
        }
      }, 0);
    }
  };

  return (
    <div className="w-full lg:w-[55%] xl:w-[54%] flex flex-col h-[50vh] lg:h-auto overflow-hidden">
      <div className="h-10 bg-gray-100 border-b-2 border-(--color-frame) flex justify-between items-center px-4 shrink-0">
        <div className="text-gray-400 text-xs font-mono tracking-widest hidden sm:block">INPUT // SRC</div>
        <div className="font-bold text-sm">Your Code</div>
        <div className="flex gap-4 text-xs font-mono font-bold">
          <button 
            onClick={onLoadSample}
            className="text-(--color-accent) hover:underline"
          >
            SAMPLE BUG
          </button>
          <button 
            onClick={() => onChange("")}
            className="text-gray-500 hover:text-(--color-frame) hover:underline"
          >
            CLEAR
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden relative bg-(--color-panel)">
        <div 
          ref={gutterRef}
          className="w-12 shrink-0 border-r-2 border-(--color-subtle) bg-gray-50 text-right pr-2 py-4 font-mono text-sm text-gray-400 overflow-hidden select-none"
        >
          {lines.map((line) => (
            <div 
              key={line} 
              className={`h-6 leading-6 ${line === errorLine ? "text-(--color-accent) font-bold" : ""}`}
            >
              {line}
            </div>
          ))}
        </div>
        
        {errorLine && (
          <div 
            className="absolute left-12 right-0 h-6 bg-(--color-accent) opacity-10 pointer-events-none"
            style={{ top: `${(errorLine - 1) * 24 + 16}px` }}
          />
        )}
        
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => {
            onChange(e.target.value);
            updateCursorPos(e.target);
          }}
          onSelect={(e) => updateCursorPos(e.currentTarget)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder="// Paste your code here..."
          spellCheck={false}
          className="flex-1 p-4 font-mono text-sm leading-6 resize-none outline-none whitespace-pre overflow-auto text-gray-800 bg-transparent"
        />
        
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-100/90 border-t-2 border-(--color-subtle) hidden sm:flex justify-between items-center px-4 font-mono text-[10px] text-gray-500 uppercase tracking-widest backdrop-blur-sm">
          <div>Ln {cursorPos.line}, Col {cursorPos.col} · {langLabel}</div>
          <div>UTF-8 · Tab Size: 4</div>
        </div>
      </div>
    </div>
  );
}
