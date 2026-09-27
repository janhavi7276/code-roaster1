import { GoogleGenAI } from "@google/genai";
import { AI } from "../config/app.config";
import { RoastRequest, RoastResult } from "../types/roast";
import { buildUserPrompt, ROAST_SYSTEM_INSTRUCTION } from "./prompt";
import { roastResponseSchema } from "./schema";

function friendlyErrorMessage(status: number, error: any): string {
  switch (status) {
    case 400:
      return "The AI engine rejected the request. It might be too long or malformed.";
    case 403:
      return "API key rejected. Check your .env.local file and ensure the Gemini key is valid.";
    case 404:
      return `The AI model "${AI.model}" was not found. Check config/app.config.ts.`;
    case 429:
      return "Rate limit exceeded. The AI needs a breather. Try again in a minute.";
    case 503:
      return "Google Gemini is currently overloaded. Please try again in a few seconds.";
    default:
      return `AI processing failed (${status}): ${error?.message || "Unknown error"}`;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const contents = buildUserPrompt(request);

  let attempt = 0;
  while (attempt < AI.maxAttempts) {
    attempt++;
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      if (!response.text) {
        throw new Error("Received empty response from Gemini.");
      }

      let result;
      try {
        result = JSON.parse(response.text);
      } catch (e) {
        throw new Error("Failed to parse AI response as JSON.");
      }

      return {
        roast: result.roast ?? "",
        issues: Array.isArray(result.issues) ? result.issues : [],
        correctedCode: result.correctedCode ?? "",
        takeaway: result.takeaway ?? "",
      };
    } catch (error: any) {
      const status = error?.status;
      if (status === 503 && attempt < AI.maxAttempts) {
        // Wait attempt * 1000ms
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }
      
      throw new Error(friendlyErrorMessage(status || 500, error));
    }
  }

  throw new Error("Maximum retry attempts reached.");
}
