import type { LetterStatus, GameStatus } from '../types/game';
import GameRow from './GameRow';

interface GameBoardProps {
  guesses: string[];
  evaluations: LetterStatus[][];
  currentGuess: string;
  maxAttempts: number;
  wordLength: number;
  isRevealing: boolean;
  isShaking: boolean;
  gameStatus: GameStatus;
}

export default function GameBoard({
  guesses,
  evaluations,
  currentGuess,
  maxAttempts,
  wordLength,
  isRevealing,
  isShaking,
  gameStatus,
}: GameBoardProps) {
  const rows = Array.from({ length: maxAttempts }, (_, i) => {
    if (i < guesses.length) {
      const isLastGuess = i === guesses.length - 1;
      return (
        <GameRow
          key={i}
          guess={guesses[i]!}
          evaluation={evaluations[i]}
          wordLength={wordLength}
          isRevealing={isLastGuess && isRevealing}
          isWinRow={isLastGuess && gameStatus === 'won'}
        />
      );
    }

    if (i === guesses.length) {
      return (
        <GameRow
          key={i}
          guess={currentGuess}
          wordLength={wordLength}
          isCurrentRow
          isShaking={isShaking}
        />
      );
    }

    return (
      <GameRow
        key={i}
        guess=""
        wordLength={wordLength}
      />
    );
  });

  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 items-center" role="grid" aria-label="game board">
      {rows}
    </div>
  );
}
