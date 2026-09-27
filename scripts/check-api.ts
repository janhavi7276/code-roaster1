import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function run() {
  console.log(`Checking Gemini API connectivity...`);
  console.log(`Model: ${AI.model}`);
  console.log(`Language: ${SAMPLE.language}`);
  console.log(`Roast Level: sharp`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n=== ROAST ===");
    console.log(result.roast);
    console.log("\n=== ISSUES FOUND ===");
    console.log(`Found ${result.issues.length} issue(s).`);
    
    console.log("\n✅ API Check Successful.");
  } catch (error: any) {
    console.error("\n❌ API Check Failed!");
    console.error(error.message || error);
    process.exit(1);
  }
}

run();
