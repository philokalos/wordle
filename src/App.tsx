import { useState, useCallback } from 'react';
import { useWordle } from './hooks/useWordle';
import { useKeyboard } from './hooks/useKeyboard';
import Header from './components/Header';
import DifficultySelector from './components/DifficultySelector';
import GameBoard from './components/GameBoard';
import HintPanel from './components/HintPanel';
import Keyboard from './components/Keyboard';
import ResultModal from './components/ResultModal';

export default function App() {
  const [showDifficulty, setShowDifficulty] = useState(true);
  const game = useWordle('normal');

  const handleChangeDifficulty = useCallback(() => {
    setShowDifficulty(true);
  }, []);

  const handleSelectDifficulty = useCallback((difficulty: Parameters<typeof game.changeDifficulty>[0]) => {
    game.changeDifficulty(difficulty);
    setShowDifficulty(false);
  }, [game]);

  useKeyboard({
    onLetter: game.addLetter,
    onEnter: game.submitGuess,
    onBackspace: game.removeLetter,
  });

  if (showDifficulty) {
    return (
      <div className="min-h-screen bg-pink-soft flex flex-col items-center justify-center p-4">
        <Header />
        <div className="mt-8 flex flex-col items-center gap-6">
          <p className="text-lg font-bold text-gray-600">난이도를 선택하세요!</p>
          <DifficultySelector
            current={game.difficulty}
            onChange={handleSelectDifficulty}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-soft flex flex-col items-center px-2 sm:px-4 pb-2">
      <Header />

      <div className="w-full max-w-lg flex flex-col items-center gap-3 sm:gap-4 flex-1">
        <DifficultySelector
          current={game.difficulty}
          onChange={handleSelectDifficulty}
        />

        {game.toastMessage && (
          <div className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg animate-pop">
            {game.toastMessage}
          </div>
        )}

        <GameBoard
          guesses={game.guesses}
          evaluations={game.evaluations}
          currentGuess={game.currentGuess}
          maxAttempts={game.maxAttempts}
          wordLength={game.wordLength}
          isRevealing={game.isRevealing}
          isShaking={game.isShaking}
          gameStatus={game.gameStatus}
        />

        <HintPanel
          hints={game.hints}
          hintsUsed={game.hintsUsed}
          maxHints={2}
          gameStatus={game.gameStatus}
          onRequestHint={game.requestHint}
        />

        <div className="w-full mt-auto pt-2">
          <Keyboard
            keyStatuses={game.keyStatuses}
            onLetter={game.addLetter}
            onEnter={game.submitGuess}
            onBackspace={game.removeLetter}
          />
        </div>
      </div>

      <ResultModal
        gameStatus={game.gameStatus}
        targetWord={game.targetWord}
        attempts={game.guesses.length}
        maxAttempts={game.maxAttempts}
        onNewGame={game.newGame}
        onChangeDifficulty={handleChangeDifficulty}
      />
    </div>
  );
}
