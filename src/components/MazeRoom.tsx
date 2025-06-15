
import { Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

// Distinct glow and gradients for each room theme
const roomThemes = [
  {
    cardGlow: "from-cyan-400/40 to-indigo-600/40 shadow-cyan-200/30",
    iconGlow: "bg-cyan-700/40 text-cyan-200 shadow-cyan-400/70",
    progress: "bg-cyan-400",
    accent: "text-cyan-100",
  },
  {
    cardGlow: "from-pink-500/30 to-purple-600/40 shadow-pink-300/40",
    iconGlow: "bg-pink-700/50 text-pink-100 shadow-pink-400/60",
    progress: "bg-pink-400",
    accent: "text-pink-100",
  },
  {
    cardGlow: "from-yellow-400/40 to-green-400/40 shadow-yellow-200/30",
    iconGlow: "bg-lime-700/50 text-yellow-100 shadow-lime-200/60",
    progress: "bg-yellow-300",
    accent: "text-yellow-100",
  },
];

const MazeRoom = ({
  room,
  progress,
  total,
  roomIdx = 0,
}: {
  room: { id: number; title: string; description: string };
  progress: number;
  total: number;
  roomIdx?: number;
}) => {
  const theme = roomThemes[roomIdx % roomThemes.length];

  return (
    <div className="flex flex-col h-full items-center justify-center animate-fade-in scale-100 animate-scale-in">
      <div className="flex items-center mb-8">
        <span className={cn(
          "p-3 rounded-full shadow-2xl mr-3 ring-2 ring-white/30",
          theme.iconGlow
        )}>
          <Puzzle size={44} className="drop-shadow-glow" />
        </span>
        <span className={cn(
          "text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg font-mono",
          theme.accent
        )}>
          Room {room.id}: <span className="font-playfair">{room.title}</span>
        </span>
      </div>
      <div className={cn(
        "w-full max-w-xl mb-8 text-lg md:text-2xl text-center font-medium backdrop-blur-xl rounded-2xl p-8 transition-all duration-300 glass-card shadow-2xl border border-white/25",
        `bg-gradient-to-br ${theme.cardGlow}`
      )}>
        <span className="text-white/90 font-mono">{room.description}</span>
      </div>
      <div className="w-full flex flex-col items-center gap-2 mt-auto opacity-80">
        <div className="w-72 h-3 bg-white/10 rounded-full overflow-hidden drop-shadow-lg border border-white/20 relative">
          <div
            className={cn(
              "h-3 rounded-full transition-all duration-300",
              theme.progress
            )}
            style={{ width: `${(progress / total) * 100}%` }}
          ></div>
          <span className={cn(
            "absolute top-1/2 left-2 -translate-y-1/2 text-xs font-bold",
            theme.accent
          )}>Progress</span>
        </div>
        <div className={cn("text-xs tracking-widest font-bold", theme.accent)}>
          Room {progress} of {total}
        </div>
      </div>
    </div>
  );
};
export default MazeRoom;
