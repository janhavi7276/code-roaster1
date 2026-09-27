import React from "react";
import { RoastResult, ReportState, LanguageId, RoastLevel } from "../types/roast";
import { EmptyState, LoadingState, ErrorState } from "./States";
import { SectionHeader } from "./SectionHeader";
import { IssueCard } from "./IssueCard";
import { FixedCode } from "./FixedCode";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  return (
    <div className="w-full lg:w-[45%] xl:w-[46%] flex flex-col border-l-0 lg:border-l-2 lg:border-t-0 border-t-2 border-(--color-frame) bg-(--color-panel) h-[50vh] lg:h-auto overflow-hidden">
      <div className="h-10 bg-gray-100 border-b-2 border-(--color-frame) flex justify-between items-center px-4 shrink-0">
        <div className="text-gray-400 text-xs font-mono tracking-widest">AUDIT // REPORT</div>
        <div className="font-bold text-sm">Roast Report</div>
        <div className="w-24"></div>
      </div>

      {state === "empty" && <EmptyState />}
      {state === "loading" && <LoadingState />}
      {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

      {state === "results" && result && (
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="mb-8">
            <SectionHeader number={1} title="Roast">
              <span className="font-mono text-xs text-gray-500 uppercase">STYLE: {roastLevel}</span>
            </SectionHeader>
            <blockquote className="text-lg font-serif italic border-l-4 border-(--color-accent) pl-4 py-1 text-gray-800">
              "{result.roast}"
            </blockquote>
          </div>

          <div className="mb-8">
            <SectionHeader number={2} title="What's Wrong">
              <span className="font-mono text-xs text-gray-500 uppercase font-bold">
                {result.issues.length} {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
              </span>
            </SectionHeader>
            
            {result.issues.length === 0 ? (
              <div className="p-4 border-2 border-green-300 bg-green-50 text-green-700 font-mono text-center font-bold">
                No issues found. Suspiciously clean.
              </div>
            ) : (
              result.issues.map((issue, idx) => (
                <IssueCard key={idx} index={idx + 1} issue={issue} />
              ))
            )}
          </div>

          {result.correctedCode && (
            <FixedCode
              sectionNumber={3}
              language={language}
              code={result.correctedCode}
              onApply={onApplyFix}
            />
          )}

          {result.takeaway && (
            <div className="mb-8">
              <SectionHeader number={result.correctedCode ? 4 : 3} title="Takeaway" />
              <p className="font-mono text-sm leading-relaxed text-gray-700 p-4 bg-gray-100 border-2 border-gray-300">
                {result.takeaway}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
