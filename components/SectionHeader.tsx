import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const paddedNumber = number.toString().padStart(2, "0");
  
  return (
    <div className="flex justify-between items-center border-b-2 border-(--color-frame) pb-2 mb-4">
      <div className="font-mono font-bold uppercase tracking-widest text-(--color-frame)">
        {paddedNumber} // {title}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
