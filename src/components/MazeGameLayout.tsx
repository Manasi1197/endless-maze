
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

  // Only show chat pane on mobile, both on desktop
  return (
    <div className="relative min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-indigo-950">
      {/* Back to Home button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute top-2 left-2 z-30 bg-indigo-900/90 hover:bg-indigo-950/100 border border-indigo-700 rounded-full flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-indigo-100 shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:top-3 sm:left-3 sm:px-4 sm:py-2 sm:text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Home
      </button>
      {!isMobile && (
        <div className="relative flex flex-col justify-between items-stretch p-0 border-b md:border-b-0 md:border-r border-indigo-900 overflow-hidden min-h-[47vh] min-[380px]:min-h-[50vw]">
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
      <div className={`flex flex-col justify-end h-[53vh] md:h-screen max-h-[58vh] md:max-h-screen p-0 bg-gray-900/90 md:max-h-none ${isMobile ? "" : ""}`}>
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
          room={maze.room} {/* <-- Pass the current room */}
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
