
import { Puzzle } from "lucide-react";
import { levelThemes } from "../utils/mazeUtils";

const MazeRoom = ({
  room,
  progress,
  total,
  level,
}: {
  room: { id: number; title: string; description: string; theme: string };
  progress: number;
  total: number;
  level: number;
}) => {
  const theme = levelThemes[room.theme] || levelThemes["neon"];

  return (
    <div
      className={`flex flex-col h-full items-center justify-center animate-fade-in transition-all duration-700`}
    >
      {/* Animated background */}
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
              Room {room.id % 3 === 0 ? 3 : room.id % 3}
            </span>
          </span>
        </div>
        <div className={`w-full max-w-lg mb-8 text-white/80 text-center text-lg font-medium p-7 rounded-2xl border-2 transition-all duration-500 ${theme.card}`}>
          <div className="mb-1 text-2xl font-bold tracking-wider text-white mb-2">
            {room.title}
          </div>
          {room.description}
        </div>
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
