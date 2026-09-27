import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({ value, onChange, onClose }: ErrorMessageInputProps) {
  return (
    <div className="border-b-2 border-(--color-frame) bg-gray-50 flex flex-col shrink-0">
      <div className="flex justify-between items-center px-4 py-2 border-b-2 border-(--color-subtle) bg-gray-100">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">
          Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button 
          onClick={onClose}
          className="text-xs font-mono font-bold text-gray-500 hover:text-(--color-frame)"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. TypeError: unsupported operand type(s) for +=: 'int' and 'list'"
        className="w-full p-4 font-mono text-sm bg-transparent outline-none resize-none min-h-[80px]"
        rows={2}
      />
    </div>
  );
}
