import { APP, AI } from "../config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-(--color-frame) bg-(--color-canvas) text-xs font-mono text-gray-500 flex flex-col p-2">
      <div className="flex justify-between items-center w-full uppercase tracking-wider px-2">
        <div className="flex gap-2">
          <span>STATUS: </span>
          {isRoasting ? (
            <span className="text-amber-500 font-bold">PROCESSING...</span>
          ) : (
            <span className="text-green-500 font-bold">ONLINE ({AI.modelLabel})</span>
          )}
          <span className="hidden sm:inline"> | ENGINE: GOOGLE GEMINI</span>
        </div>
        <div className="font-bold">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>
      <div className="text-center w-full mt-2 text-[10px] opacity-70 tracking-wide">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
