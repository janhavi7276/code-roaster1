"use client";
import React, { useState, useEffect, useCallback } from "react";
import { DEFAULTS, SAMPLE } from "../config/app.config";
import { LanguageId, RoastLevel, ReportState, RoastResult } from "../types/roast";
import { requestRoast } from "../lib/api";
import { TopBar } from "./TopBar";
import { RoastControls } from "./RoastControls";
import { ErrorMessageInput } from "./ErrorMessageInput";
import { CodeEditor } from "./CodeEditor";
import { RoastReport } from "./RoastReport";
import { StatusBar } from "./StatusBar";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState(false);
  
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string | null>(null);
  const [apiError, setApiError] = useState("");

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;
    
    if (!code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setRoastResult(null);
    setApiError("");

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage: errorMessage.trim(),
      });
      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (error: any) {
      setApiError(error.message || "An unknown error occurred.");
      setReportState("error");
    }
  }, [isRoasting, code, language, roastLevel, errorMessage]);

  const handleLoadSample = () => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  const errorLine = reportState === "results" && code === roastedCode 
    ? roastResult?.issues[0]?.line 
    : undefined;

  return (
    <main className="w-full max-w-[1360px] h-[95vh] min-h-[600px] mx-auto my-4 bg-(--color-canvas) border-2 border-(--color-frame) shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] flex flex-col overflow-hidden relative">
      <TopBar>
        <RoastControls 
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen(!errorDrawerOpen)}
        />
      </TopBar>

      {errorDrawerOpen && (
        <ErrorMessageInput 
          value={errorMessage} 
          onChange={setErrorMessage} 
          onClose={() => setErrorDrawerOpen(false)} 
        />
      )}

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <CodeEditor 
          code={code}
          onChange={setCode}
          language={language}
          errorLine={errorLine}
          onLoadSample={handleLoadSample}
        />
        <RoastReport 
          state={reportState}
          roastLevel={roastLevel}
          language={language}
          result={roastResult}
          errorMsg={apiError}
          onRetry={handleRoast}
          onApplyFix={(fixedCode) => setCode(fixedCode)}
        />
      </div>

      <StatusBar isRoasting={isRoasting} />
    </main>
  );
}
