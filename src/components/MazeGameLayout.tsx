
import MazeRoom from "./MazeRoom";
import MazeWin from "./MazeWin";
import MazeChat from "./MazeChat";
import { useMazeGame } from "../hooks/useMazeGame";

// Glowy, dynamic backgrounds for each room:
const bgGradients = [
  "bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#409cff]", // Room 1: blue futuristic
  "bg-gradient-to-br from-[#42275a] via-[#734b6d] to-[#fd746c]", // Room 2: purple/pink fire
  "bg-gradient-to-br from-[#134e5e] via-[#71b280] to-[#fffc00]", // Room 3: green/yellow electric
];

// Animated particles overlay (simple SVG stars & dots)
function ParticleBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <svg width="100%" height="100%">
        {Array.from({ length: 60 }).map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 1800}
            cy={Math.random() * 1040}
            r={Math.random() > 0.6 ? 1.6 : 0.8 + Math.random() * 1.6}
            fill={`rgba(255,255,255,${Math.random() * 0.21 + 0.08})`}
            style={{
              filter: `blur(${Math.random() > 0.9 ? 3 : 0}px) drop-shadow(0 0 6px #7ee9fd55)`,
              opacity: Math.random() * 0.5 + 0.18,
              animation: `pulse 2.8s ease-in-out infinite alternate ${i * 113}ms`,
            }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes pulse {
          from { opacity: 0.35;}
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Special win background
const winGradient = "bg-gradient-to-br from-[#0fde94] via-[#29dbf9] to-[#bb76f5]";

const MazeGameLayout = () => {
  const maze = useMazeGame();
  const finished = maze.progress > maze.total;

  // Animate bg color on level up
  const roomIdx = (maze.progress - 1) % bgGradients.length;
  const bgClass = finished ? winGradient : bgGradients[roomIdx];

  return (
    <div className={`relative w-full min-h-screen overflow-hidden`}>
      <ParticleBg />
      <div className={`min-h-screen w-full grid grid-cols-1 md:grid-cols-2 transition-colors duration-700 ${bgClass} relative z-0`}>
        <div className="flex flex-col justify-between items-stretch px-4 md:px-10 py-6 md:py-10 border-b md:border-b-0 md:border-r border-[#ffffff33] backdrop-blur-md">
          {finished ? (
            <MazeWin />
          ) : (
            <MazeRoom
              room={maze.room}
              progress={maze.progress}
              total={maze.total}
              key={maze.room.id}
              roomIdx={roomIdx}
            />
          )}
        </div>
        <div className="flex flex-col justify-end h-screen max-h-screen p-0">
          <MazeChat
            chat={maze.chat}
            userInput={maze.userInput}
            setUserInput={maze.setUserInput}
            sendMessage={maze.sendMessage}
            isLoading={maze.isLoading}
            guideTyping={maze.guideTyping}
            roomIdx={roomIdx}
            finished={finished}
          />
        </div>
      </div>
    </div>
  );
};
export default MazeGameLayout;
