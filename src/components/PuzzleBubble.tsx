
import { Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

const colors = [
  "bg-cyan-800/70 text-cyan-100 border-cyan-400/50",
  "bg-pink-800/80 text-pink-100 border-pink-400/60",
  "bg-yellow-600/80 text-yellow-900 border-yellow-400/70",
];

const PuzzleBubble = ({ text, idx = 0 }: { text: string, idx?: number }) => (
  <div className={cn(
    "flex items-start mb-3 animate-fade-in group"
  )}>
    <span className="mt-1 mr-2">
      <Puzzle size={22} className={cn(
        "opacity-80 group-hover:scale-110 transition-transform duration-200 drop-shadow",
        idx === 1 ? "text-pink-300" : idx === 2 ? "text-yellow-300" : "text-cyan-200"
      )} />
    </span>
    <div className={cn(
      "backdrop-blur-[2px] px-4 py-2 rounded-xl rounded-tl-sm max-w-lg shadow-lg border font-mono text-base md:text-lg",
      colors[idx % colors.length],
      "glow-bubble"
    )}>
      {text}
    </div>
    <style>{`
      .glow-bubble { box-shadow: 0 4px 20px #7ee9fd19, 0 2px 4px #fff1; }
    `}</style>
  </div>
);

export default PuzzleBubble;
