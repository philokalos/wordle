import type { LetterStatus } from '../types/game';

interface KeyboardProps {
  keyStatuses: Map<string, LetterStatus>;
  onLetter: (letter: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
];

const KEY_COLORS: Record<LetterStatus, { bg: string; text: string; border: string }> = {
  correct: { bg: '#22c55e', text: '#ffffff', border: '#16a34a' },
  present: { bg: '#eab308', text: '#ffffff', border: '#ca8a04' },
  absent: { bg: '#9ca3af', text: '#ffffff', border: '#6b7280' },
};

const DEFAULT_KEY = { bg: '#e5e7eb', text: '#1f2937', border: '#d1d5db' };

export default function Keyboard({
  keyStatuses,
  onLetter,
  onEnter,
  onBackspace,
}: KeyboardProps) {
  function handleClick(key: string) {
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'BACK') {
      onBackspace();
    } else {
      onLetter(key);
    }
  }

  return (
    <div className="flex flex-col gap-1.5 items-center w-full max-w-lg mx-auto" aria-label="keyboard">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 sm:gap-1.5 justify-center w-full">
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === 'BACK';
            const status = isSpecial ? undefined : keyStatuses.get(key);
            const displayKey = key === 'BACK' ? '⌫' : key === 'ENTER' ? '↵' : key;
            const colors = status ? KEY_COLORS[status] : DEFAULT_KEY;

            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                className={[
                  isSpecial ? 'px-3 sm:px-4' : 'px-2 sm:px-3',
                  'py-3 sm:py-4',
                  'rounded-lg border',
                  'font-bold',
                  isSpecial ? 'text-base sm:text-lg' : 'text-sm sm:text-base',
                  'transition-colors duration-150',
                  'select-none active:scale-95',
                ].join(' ')}
                style={{
                  backgroundColor: colors.bg,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                role="button"
                aria-label={key === 'BACK' ? 'backspace' : key.toLowerCase()}
              >
                {displayKey}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
