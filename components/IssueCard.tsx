import React from "react";
import { RoastIssue } from "../types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityMap = {
  "FATAL BUG": "bg-red-100 text-red-700 border-red-300",
  "CODE SMELL": "bg-amber-100 text-amber-700 border-amber-300",
  "OPTIMIZATION": "bg-green-100 text-green-700 border-green-300",
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = index.toString().padStart(2, "0");
  const sevStyle = severityMap[issue.severity] || severityMap["CODE SMELL"];

  return (
    <div className="bg-white border-2 border-(--color-frame) shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] mb-6 overflow-hidden">
      <div className="flex items-start justify-between p-3 border-b-2 border-(--color-subtle) bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="bg-(--color-frame) text-white font-mono text-xs font-bold px-2 py-1">
            {paddedIndex}
          </div>
          <div className="font-mono font-bold text-sm">LINE {issue.line}</div>
          <div className={`font-mono text-[10px] font-bold px-2 py-0.5 border ${sevStyle}`}>
            {issue.severity}
          </div>
        </div>
        <div className="text-right text-xs text-gray-500 max-w-[50%] leading-tight ml-4 break-words">
          {issue.title}
        </div>
      </div>
      
      <div className="p-0 border-b-2 border-(--color-subtle) relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-(--color-accent)"></div>
        <pre className="p-3 pl-4 overflow-x-auto text-sm font-mono bg-gray-50 text-gray-800 m-0 whitespace-pre-wrap">
          <code>{issue.codeSnippet}</code>
        </pre>
      </div>
      
      <div className="p-3 bg-white font-mono text-sm flex flex-col gap-2">
        <div className="text-(--color-accent)">
          <span className="font-bold">✕ Diagnosis:</span> {issue.diagnosis}
        </div>
        <div className="text-green-700">
          <span className="font-bold">✓ Expected:</span> {issue.expected}
        </div>
      </div>
    </div>
  );
}
