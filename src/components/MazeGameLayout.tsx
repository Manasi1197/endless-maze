
import MazeRoom from "./MazeRoom";
import MazeChat from "./MazeChat";
import { useMazeGame } from "../hooks/useMazeGame";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MazeGameLayout = () => {
  const maze = useMazeGame();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* Back to Home button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute top-3 left-3 z-30 bg-indigo-950/80 hover:bg-indigo-950/95 border border-indigo-700 rounded-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-100 shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Home
      </button>
      <div className="relative flex flex-col justify-between items-stretch p-0 border-b md:border-b-0 md:border-r border-indigo-900 overflow-hidden">
        <MazeRoom
          room={maze.room}
          progress={maze.progress}
          total={maze.total}
          level={maze.level}
          roomSolved={maze.roomSolved}
          advanceRoom={maze.advanceRoom}
          levelComplete={maze.levelComplete}
          advanceLevel={maze.advanceLevel}
        />
      </div>
      <div className="flex flex-col justify-end h-[60vh] md:h-screen max-h-screen p-0 bg-gray-900/90">
        <MazeChat
          chat={maze.chat}
          userInput={maze.userInput}
          setUserInput={maze.setUserInput}
          sendMessage={maze.sendMessage}
          isLoading={maze.isLoading}
          guideTyping={maze.guideTyping}
        />
      </div>
      <style>
        {`
          @media (max-width: 767px) {
            .md\\:grid-cols-2 {
              grid-template-columns: 1fr !important;
            }
            .md\\:h-screen {
              height: auto !important;
            }
          }
        `}
      </style>
    </div>
  );
};
export default MazeGameLayout;

