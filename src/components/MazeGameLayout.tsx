
import MazeRoom from "./MazeRoom";
import MazeChat from "./MazeChat";
import { useMazeGame } from "../hooks/useMazeGame";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const MazeGameLayout = () => {
  const maze = useMazeGame();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 flex flex-col md:grid md:grid-cols-2 scroll-smooth">
      {/* Back to Home button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute top-3 left-3 z-30 bg-indigo-900/90 hover:bg-indigo-950 border border-indigo-700 rounded-full flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold text-indigo-100 shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Home
      </button>
      {/* Main game/room panel on desktop */}
      {!isMobile && (
        <div className="relative flex flex-col justify-between items-stretch py-6 px-2 sm:px-4 min-h-[47vh] min-[380px]:min-h-[50vw] border-r border-indigo-900 bg-indigo-950/80 shadow-xl">
          <MazeRoom
            room={maze.room}
            progress={maze.progress}
            total={maze.total}
            level={maze.level}
            roomSolved={maze.roomSolved}
            advanceRoom={maze.advanceRoom}
            levelComplete={maze.levelComplete}
            advanceLevel={maze.advanceLevel}
            isMobile={false}
          />
        </div>
      )}
      {/* Chat column */}
      <div className={`relative flex flex-col justify-end w-full h-[53vh] md:h-screen max-h-[58vh] md:max-h-screen px-0 pt-2 pb-0 bg-gray-900/90 md:max-h-none shadow-inner md:shadow-none`}>
        <MazeChat
          chat={maze.chat}
          userInput={maze.userInput}
          setUserInput={maze.setUserInput}
          sendMessage={maze.sendMessage}
          isLoading={maze.isLoading}
          guideTyping={maze.guideTyping}
          isMobile={isMobile}
          roomSolved={maze.roomSolved}
          advanceRoom={maze.advanceRoom}
          levelComplete={maze.levelComplete}
          advanceLevel={maze.advanceLevel}
          level={maze.level}
          room={maze.room}
        />
      </div>
      {/* Responsive style fix */}
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

