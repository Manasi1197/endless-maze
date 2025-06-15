
import { cn } from "@/lib/utils";

const colors = [
  "bg-cyan-700/90 text-white border-cyan-400/40",
  "bg-pink-700/90 text-white border-pink-400/40",
  "bg-yellow-400/80 text-gray-900 border-yellow-200/45",
];

const UserBubble = ({ text, idx = 0 }: { text: string, idx?: number }) => (
  <div className={cn(
    "flex items-start justify-end mb-3 animate-fade-in"
  )}>
    <div className={cn(
      "px-4 py-2 rounded-xl rounded-tr-sm max-w-lg ml-auto shadow border font-mono text-base md:text-lg backdrop-blur-[2px]",
      colors[idx % colors.length],
      "user-bubble-glow"
    )}>
      {text}
    </div>
    <style>{`
      .user-bubble-glow { box-shadow: 0 3px 16px #fff3,0 2px 4px #0ff1; }
    `}</style>
  </div>
);

export default UserBubble;
