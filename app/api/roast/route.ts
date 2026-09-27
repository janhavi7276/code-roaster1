import { NextRequest, NextResponse } from "next/server";
import { analyzeCode } from "../../../lib/gemini";
import { LANGUAGES, ROAST_LEVELS, DEFAULTS, LIMITS } from "../../../config/app.config";
import { LanguageId, RoastLevel } from "../../../types/roast";

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const rawCode = typeof body.code === "string" ? body.code : "";
    const rawErrorMessage = typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

    if (!rawCode.trim()) {
      return NextResponse.json({ error: "No code provided." }, { status: 400 });
    }
    if (rawCode.length > LIMITS.maxCodeLength) {
      return NextResponse.json({ error: `Code exceeds maximum length of ${LIMITS.maxCodeLength} characters.` }, { status: 400 });
    }
    if (rawErrorMessage.length > LIMITS.maxErrorMessageLength) {
      return NextResponse.json({ error: `Error message exceeds maximum length of ${LIMITS.maxErrorMessageLength} characters.` }, { status: 400 });
    }

    const language = LANGUAGES.find((l) => l.id === body.language)?.id ?? DEFAULTS.language;
    const roastLevel = ROAST_LEVELS.find((l) => l.id === body.roastLevel)?.id ?? DEFAULTS.roastLevel;

    const result = await analyzeCode({
      language: language as LanguageId,
      code: rawCode,
      roastLevel: roastLevel as RoastLevel,
      errorMessage: rawErrorMessage,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("API /roast failed:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during analysis." },
      { status: 500 }
    );
  }
}
