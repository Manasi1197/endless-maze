
import { Puzzle } from "lucide-react";
import { levelThemes } from "../utils/mazeUtils";
import { useRef, useEffect } from "react";

const MazeRoom = ({
  room,
  progress,
  total,
  level,
  roomSolved,
  advanceRoom,
  levelComplete,
  advanceLevel,
}: {
  room: { id: number; title: string; description: string; theme: string };
  progress: number;
  total: number;
  level: number;
  roomSolved?: boolean;
  advanceRoom?: () => void;
  levelComplete?: boolean;
  advanceLevel?: () => void;
}) => {
  const theme = levelThemes[room.theme] || levelThemes["neon"];
  const confettiRef = useRef<HTMLDivElement>(null);

  // Simple confetti animation for congrats!
  useEffect(() => {
    if (levelComplete && confettiRef.current) {
      confettiRef.current.animate(
        [
          { opacity: 0, transform: "scale(0.7)" },
          { opacity: 1, transform: "scale(1.2)" },
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(0.6)" }
        ],
        { duration: 2000, easing: "ease-out" }
      );
    }
  }, [levelComplete]);

  return (
    <div
      className={`flex flex-col h-full items-center justify-center animate-fade-in transition-all duration-700`}
    >
      <div
        className={`absolute inset-0 z-0 bg-gradient-to-br ${theme.gradient} animate-fade-in`}
        style={{ opacity: 0.95, filter: "blur(1.5px)" }}
      />
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <div className="flex items-center mb-8 mt-2 drop-shadow-lg">
          <span className={`p-4 rounded-full mr-3 border-2 ${theme.accent} bg-white/20 shadow-lg`}>
            <Puzzle size={44} className="text-indigo-300" />
          </span>
          <span className="text-4xl font-bold text-white/90 tracking-wide drop-shadow-md">
            Level {level}
            <span className="ml-6 text-xl text-white/60 font-semibold">
              Room {(room.id - 1) % 3 + 1}
            </span>
          </span>
        </div>
        <div className={`w-full max-w-lg mb-8 text-white/80 text-center text-lg font-medium p-7 rounded-2xl border-2 transition-all duration-500 ${theme.card}`}>
          <div className="mb-1 text-2xl font-bold tracking-wider text-white mb-2">
            {room.title}
          </div>
          {room.description}
        </div>
        {/* Button logic for progressing */}
        {roomSolved && !levelComplete && (
          <button
            className="animate-fade-in mb-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl text-lg font-bold shadow-lg transition-all hover:scale-105"
            onClick={advanceRoom}
          >
            Next Room &rarr;
          </button>
        )}
        {levelComplete && (
          <div
            className="flex flex-col items-center justify-center animate-fade-in mt-6 mb-10" // <-- Increased bottom margin
            ref={confettiRef}
          >
            <div className="relative">
              <span className="text-5xl drop-shadow-glow font-extrabold text-yellow-300 animate-pulse">
                🎉 Congratulations!
              </span>
            </div>
            <div className="text-xl text-white/80 mt-4 font-semibold">
              You have completed Level {level}.
            </div>
            <button
              className="animate-fade-in mt-7 px-5 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl text-base font-bold shadow-xl transition-all hover:scale-105"
              onClick={advanceLevel}
            >
              Next Level &darr;
            </button>
          </div>
        )}
        <div className="w-full flex flex-col items-center gap-2 mt-auto">
          <div className={`w-64 ${theme.accent} rounded-full h-3 mb-2 overflow-hidden shadow-outline-lg`} style={{ filter: "brightness(1.1)" }}>
            <div
              className="h-3 bg-white/60 rounded-full transition-all duration-300"
              style={{ width: `${(progress / total) * 100}%` }}
            ></div>
          </div>
          <div className="text-indigo-100 text-xs tracking-widest">
            Progress: Step {progress} of {total}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MazeRoom;
