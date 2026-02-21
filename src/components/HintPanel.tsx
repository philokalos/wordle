import type { Hint, HintType, GameStatus } from '../types/game';

interface HintPanelProps {
  hints: Hint[];
  hintsUsed: number;
  maxHints: number;
  gameStatus: GameStatus;
  onRequestHint: (type: HintType) => void;
}

export default function HintPanel({
  hints,
  hintsUsed,
  maxHints,
  gameStatus,
  onRequestHint,
}: HintPanelProps) {
  const canUseHint = hintsUsed < maxHints && gameStatus === 'playing';
  const usedExample = hints.some((h) => h.type === 'example');
  const usedFirstLetter = hints.some((h) => h.type === 'firstLetter');

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-sm mx-auto">
      <div className="flex gap-2">
        <button
          onClick={() => onRequestHint('example')}
          disabled={!canUseHint || usedExample}
          className={`
            px-3 py-1.5 rounded-full text-sm font-semibold
            transition-all duration-200 select-none
            ${canUseHint && !usedExample
              ? 'bg-pink-100 text-pink-600 border-2 border-pink-300 hover:bg-pink-200 active:scale-95'
              : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
            }
          `}
          aria-label="get example hint"
        >
          📝 예문 힌트
        </button>
        <button
          onClick={() => onRequestHint('firstLetter')}
          disabled={!canUseHint || usedFirstLetter}
          className={`
            px-3 py-1.5 rounded-full text-sm font-semibold
            transition-all duration-200 select-none
            ${canUseHint && !usedFirstLetter
              ? 'bg-pink-100 text-pink-600 border-2 border-pink-300 hover:bg-pink-200 active:scale-95'
              : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
            }
          `}
          aria-label="get first letter hint"
        >
          🔤 첫 글자 힌트
        </button>
      </div>

      <p className="text-xs text-gray-400">
        힌트 {hintsUsed}/{maxHints}
      </p>

      {hints.length > 0 && (
        <div className="flex flex-col gap-1 w-full">
          {hints.map((hint, i) => (
            <div
              key={i}
              className="bg-pink-50 border border-pink-200 rounded-lg px-3 py-2 text-sm text-pink-700 text-center font-semibold"
            >
              {hint.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
