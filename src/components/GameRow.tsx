import type { LetterStatus } from '../types/game';
import LetterTile from './LetterTile';

interface GameRowProps {
  guess: string;
  evaluation?: LetterStatus[];
  wordLength: number;
  isCurrentRow?: boolean;
  isRevealing?: boolean;
  isShaking?: boolean;
  isWinRow?: boolean;
}

export default function GameRow({
  guess,
  evaluation,
  wordLength,
  isCurrentRow = false,
  isRevealing = false,
  isShaking = false,
  isWinRow = false,
}: GameRowProps) {
  const tiles = Array.from({ length: wordLength }, (_, i) => {
    const letter = guess[i] ?? '';
    const status = evaluation?.[i];
    const isPopping = isCurrentRow && letter !== '' && !evaluation;

    return (
      <LetterTile
        key={i}
        letter={letter}
        status={status}
        delay={i * 300}
        isRevealing={isRevealing}
        isBouncing={isWinRow}
        isPopping={isPopping}
      />
    );
  });

  return (
    <div
      className={`flex gap-1.5 sm:gap-2 ${isShaking ? 'animate-shake' : ''}`}
      role="row"
      aria-label={guess || 'empty row'}
    >
      {tiles}
    </div>
  );
}
