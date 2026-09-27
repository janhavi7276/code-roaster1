export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-(--color-frame)">
      <div className="w-16 h-16 mb-4 border-2 border-dashed border-gray-400 flex items-center justify-center text-2xl text-gray-400 font-mono">
        {}
      </div>
      <h2 className="text-xl font-bold uppercase tracking-widest mb-2 font-display">Awaiting Code Submission</h2>
      <p className="text-gray-500 font-mono max-w-md">
        Paste your code on the left, then click "ROAST MY CODE" or press Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-(--color-frame)">
      <div className="w-16 h-16 mb-4 border-2 border-(--color-frame) flex items-center justify-center text-3xl font-mono animate-spin-slow">
        /
      </div>
      <h2 className="text-xl font-bold uppercase tracking-widest mb-2 font-display animate-pulse">Analyzing Code</h2>
      <p className="text-gray-500 font-mono max-w-md">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 mb-4 border-2 border-(--color-accent) text-(--color-accent) flex items-center justify-center text-3xl font-bold">
        !
      </div>
      <h2 className="text-xl font-bold uppercase tracking-widest mb-2 font-display text-(--color-accent)">Analysis Failed</h2>
      <p className="text-gray-500 font-mono max-w-md mb-6">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-2 border-2 border-(--color-frame) bg-white text-(--color-frame) font-bold font-mono hover:bg-(--color-frame) hover:text-white transition-colors"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
