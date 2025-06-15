
import { Puzzle } from "lucide-react";
import { ArrowDown } from "lucide-react";
import { levelThemes } from "../utils/mazeUtils";
import { Button } from "./ui/button";
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
          { opacity: 1, transform: "scale(1.15) rotate(-2deg)" },
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(0.95)" }
        ],
        { duration: 1900, easing: "ease-out" }
      );
    }
  }, [levelComplete]);

  return (
    <div className="flex flex-col h-full items-center justify-center animate-fade-in transition-all duration-700">
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
            className="flex flex-col items-center justify-center animate-fade-in mt-6 w-full"
            ref={confettiRef}
          >
            <div className="relative w-full max-w-xl rounded-3xl p-7 flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-blue-600 to-cyan-400 shadow-2xl border-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-5xl">🎉</span>
                <span className="text-5xl font-black tracking-wide pb-1" style={{ color: "#c5b356" }}>
                  Congratulations!
                </span>
              </div>
              <div className="text-white text-xl font-semibold my-2">
                You have completed Level {level}.
              </div>
              <Button
                variant="default"
                className="mt-6 px-10 py-4 text-xl font-extrabold rounded-full bg-fuchsia-500 hover:bg-fuchsia-400 transition-all shadow-2xl drop-shadow-lg focus:outline-none border-0"
                onClick={advanceLevel}
                style={{
                  boxShadow: "0 8px 40px 0 #58e0ff77, 0 1.5px 0 #8780ff",
                  letterSpacing: '0.03em'
                }}
              >
                Next Level
                <ArrowDown className="ml-2" size={28} />
              </Button>
              <div className="w-full flex flex-col items-center mt-6">
                <div
                  className="h-3 rounded-full bg-cyan-200 shadow-lg"
                  style={{
                    width: "75%",
                    boxShadow: "0 0 18px 0 #7de5f7"
                  }}
                />
              </div>
            </div>
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

