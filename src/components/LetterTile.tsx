import { useState, useEffect } from 'react';
import type { LetterStatus } from '../types/game';

interface LetterTileProps {
  letter: string;
  status?: LetterStatus;
  delay?: number;
  isRevealing?: boolean;
  isBouncing?: boolean;
  isPopping?: boolean;
}

const STATUS_COLORS: Record<LetterStatus, { bg: string; border: string }> = {
  correct: { bg: '#22c55e', border: '#16a34a' },
  present: { bg: '#eab308', border: '#ca8a04' },
  absent: { bg: '#9ca3af', border: '#6b7280' },
};

export default function LetterTile({
  letter,
  status,
  delay = 0,
  isRevealing = false,
  isBouncing = false,
  isPopping = false,
}: LetterTileProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isRevealing && status) {
      // Reveal color at the midpoint of the flip animation
      const timer = setTimeout(() => setRevealed(true), delay + 250);
      return () => clearTimeout(timer);
    } else if (status && !isRevealing) {
      setRevealed(true);
    } else {
      setRevealed(false);
    }
  }, [isRevealing, status, delay]);

  const showColor = revealed && status;
  const colors = showColor ? STATUS_COLORS[status] : null;
  const hasLetter = letter !== '';

  return (
    <div
      className={[
        'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16',
        'flex items-center justify-center',
        'border-2 rounded-lg',
        'text-xl sm:text-2xl md:text-3xl font-extrabold',
        'select-none',
        isRevealing ? 'animate-flip' : '',
        isBouncing ? 'animate-bounce-win' : '',
        isPopping ? 'animate-pop' : '',
      ].join(' ')}
      style={{
        backgroundColor: colors ? colors.bg : '#ffffff',
        borderColor: colors ? colors.border : (hasLetter && !status ? '#a855f7' : '#d1d5db'),
        color: colors ? '#ffffff' : '#1f2937',
        animationDelay: isRevealing || isBouncing ? `${delay}ms` : '0ms',
        animationFillMode: 'both',
      }}
      aria-label={letter ? `${letter}${status ? `, ${status}` : ''}` : 'empty'}
    >
      {letter}
    </div>
  );
}
