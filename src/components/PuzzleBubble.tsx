
import { Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

const PuzzleBubble = ({ text }: { text: string }) => (
  <div className={cn(
    "flex items-start mb-3 animate-fade-in group"
  )}>
    <span className="mt-1 mr-2">
      <Puzzle size={22} className="text-indigo-400 opacity-70 group-hover:scale-110 transition-transform duration-200" />
    </span>
    <div className="bg-indigo-800/90 text-indigo-100 px-4 py-2 rounded-xl rounded-tl-sm max-w-lg shadow-lg border border-indigo-700">
      {text}
    </div>
  </div>
);
export default PuzzleBubble;
