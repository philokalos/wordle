export default function Header() {
  return (
    <header className="text-center py-3 sm:py-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        🌸 Wordle 🌸
      </h1>
      <p className="text-sm text-gray-400 mt-1 font-semibold">
        영어 단어 맞추기 게임
      </p>
    </header>
  );
}
