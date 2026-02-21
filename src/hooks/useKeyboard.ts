import { useEffect } from 'react';

interface UseKeyboardOptions {
  onLetter: (letter: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

export function useKeyboard({ onLetter, onEnter, onBackspace }: UseKeyboardOptions): void {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        onEnter();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        onBackspace();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        onLetter(e.key.toUpperCase());
      } else if (e.code && /^Key[A-Z]$/.test(e.code)) {
        // Korean IME active: e.key is not English, use physical key code
        e.preventDefault();
        onLetter(e.code.slice(3));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onLetter, onEnter, onBackspace]);
}
