"use client";
import React, { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { LANGUAGES } from "../config/app.config";
import { LanguageId } from "../types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({ sectionNumber, language, code, onApply }: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const ext = LANGUAGES.find((l) => l.id === language)?.extension || "txt";
  const filename = `solution.${ext}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch (e) {
      setCopyStatus("failed");
    }
    setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  };

  const getCopyLabel = () => {
    if (copyStatus === "copied") return "✓ COPIED TO CLIPBOARD";
    if (copyStatus === "failed") return "✕ COPY BLOCKED, SELECT MANUALLY";
    return "📋 COPY FIXED CODE";
  };

  return (
    <div className="mb-8">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-bold text-green-600 tracking-widest text-sm uppercase">CORRECTED CODE</span>
      </SectionHeader>

      <div className="border-2 border-(--color-frame) shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] bg-white overflow-hidden mb-4">
        <div className="flex justify-between items-center p-2 border-b-2 border-(--color-frame) bg-gray-100 font-mono text-xs">
          <div className="text-gray-600">{filename}</div>
          <div className="font-bold text-green-600 tracking-wider">READY TO APPLY</div>
        </div>
        <div className="p-4 bg-gray-50 overflow-x-auto">
          <pre className="font-mono text-sm text-gray-800 m-0">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleCopy}
          className="flex-1 py-3 px-4 border-2 border-(--color-frame) font-mono font-bold text-sm bg-white text-(--color-frame) hover:bg-(--color-frame) hover:text-white transition-colors text-center"
        >
          {getCopyLabel()}
        </button>
        <button
          onClick={() => onApply(code)}
          className="flex-1 py-3 px-4 border-2 border-(--color-frame) font-mono font-bold text-sm bg-white text-(--color-frame) hover:bg-(--color-frame) hover:text-white transition-colors text-center"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
