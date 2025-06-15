
import { CircleCheck } from "lucide-react";

const MazeWin = () => (
  <div className="flex flex-col items-center justify-center h-full animate-fade-in">
    <div className="relative w-fit">
      <CircleCheck className="text-green-300 drop-shadow-glow mb-7" size={96} />
      {/* Confetti */}
      <div className="absolute -top-2 left-0 w-full pointer-events-none select-none">
        <span className="block w-24 h-2 bg-gradient-to-r from-cyan-400 to-emerald-300 rounded-full blur-md opacity-60 animate-pulse"></span>
        <span className="block w-20 h-1 bg-gradient-to-r from-pink-400 to-yellow-200 rounded-full blur-sm opacity-60 animate-pulse mt-1"></span>
      </div>
    </div>
    <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-green-200 drop-shadow font-playfair tracking-wider">
      🎉 You Escaped the Maze!
    </h2>
    <p className="text-indigo-100 mt-2 mb-8 text-2xl text-center max-w-xl font-mono">
      You solved every riddle, outsmarted the Maze Guide, and reached the digital core.<br />
      <span className="text-green-300 font-semibold">Well done, maze master!</span>
    </p>
    <div className="mt-8 mb-4 text-base text-indigo-200/80 opacity-85">
      (Refresh to play again and test other paths!)
    </div>
    <style>{`
      .drop-shadow-glow { filter: drop-shadow(0 0 10px #55faa3cc); }
      .font-playfair { font-family: 'Playfair Display', serif; }
    `}</style>
  </div>
);
export default MazeWin;
