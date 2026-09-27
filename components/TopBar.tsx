import React from "react";
import { APP } from "../config/app.config";

interface TopBarProps {
  children: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-(--color-frame) bg-white p-4 flex flex-col xl:flex-row justify-between items-center gap-4 shrink-0 relative z-10">
      <div className="flex items-center gap-4 shrink-0">
        <h1 className="font-display text-2xl font-black uppercase tracking-[0.2em] text-(--color-frame)">
          {APP.name}
        </h1>
        <div className="font-mono text-[10px] font-bold border-2 border-(--color-frame) px-1.5 py-0.5">
          {APP.version}
        </div>
      </div>
      <div className="w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0">
        {children}
      </div>
    </header>
  );
}
