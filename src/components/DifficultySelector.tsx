import type { Difficulty } from '../types/game';
import { DIFFICULTY_CONFIG } from '../types/game';

interface DifficultySelectorProps {
  current: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const DIFFICULTIES: Difficulty[] = ['easy', 'normal', 'hard'];

export default function DifficultySelector({ current, onChange }: DifficultySelectorProps) {
  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {DIFFICULTIES.map((diff) => {
        const config = DIFFICULTY_CONFIG[diff];
        const isActive = diff === current;

        return (
          <button
            key={diff}
            onClick={() => onChange(diff)}
            className={`
              px-3 sm:px-5 py-2 sm:py-2.5 rounded-full
              font-bold text-sm sm:text-base
              transition-all duration-200
              border-2 select-none
              ${isActive
                ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-200 scale-105'
                : 'bg-white border-purple-200 text-purple-600 hover:border-purple-400 hover:bg-purple-50'
              }
            `}
            aria-label={`${config.label} mode - ${config.wordLength} letters`}
            aria-pressed={isActive}
          >
            {config.emoji} {config.label}
            <span className="ml-1 text-xs opacity-75">({config.wordLength})</span>
          </button>
        );
      })}
    </div>
  );
}
