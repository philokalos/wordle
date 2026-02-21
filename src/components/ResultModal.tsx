import type { GameStatus } from '../types/game';
import type { WordEntry } from '../types/word';

interface ResultModalProps {
  gameStatus: GameStatus;
  targetWord: WordEntry;
  attempts: number;
  maxAttempts: number;
  onNewGame: () => void;
  onChangeDifficulty: () => void;
}

export default function ResultModal({
  gameStatus,
  targetWord,
  attempts,
  maxAttempts,
  onNewGame,
  onChangeDifficulty,
}: ResultModalProps) {
  if (gameStatus === 'playing') return null;

  const isWin = gameStatus === 'won';

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl
          animate-[pop_0.3s_ease-in-out]"
        role="dialog"
        aria-label={isWin ? 'You won!' : 'Game over'}
      >
        <div className="text-center">
          <div className="text-4xl sm:text-5xl mb-3">
            {isWin ? '🎉' : '😢'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-1">
            {isWin ? '정답!' : '아쉬워요!'}
          </h2>
          {isWin && (
            <p className="text-gray-500 text-sm mb-4">
              {attempts}/{maxAttempts} 번 만에 맞혔어요!
            </p>
          )}
        </div>

        <div className="bg-purple-50 rounded-xl p-4 mb-5">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-purple-700 tracking-widest mb-2">
              {targetWord.word}
            </p>
            <p className="text-lg font-bold text-gray-700 mb-1">
              {targetWord.meaning}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              [{targetWord.pronunciation}]
            </p>
            <p className="text-sm text-gray-600 italic bg-white rounded-lg p-2">
              &quot;{targetWord.example}&quot;
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onNewGame}
            className="w-full py-3 bg-purple-500 text-white rounded-xl
              font-bold text-base hover:bg-purple-600 active:scale-98
              transition-all duration-150 shadow-lg shadow-purple-200"
          >
            🔄 다시 하기
          </button>
          <button
            onClick={onChangeDifficulty}
            className="w-full py-3 bg-white text-purple-600 rounded-xl
              font-bold text-base border-2 border-purple-200
              hover:bg-purple-50 active:scale-98 transition-all duration-150"
          >
            ⚙️ 난이도 변경
          </button>
        </div>
      </div>
    </div>
  );
}
