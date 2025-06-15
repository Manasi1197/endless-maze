
import MazeRoom from "./MazeRoom";
import MazeChat from "./MazeChat";
import { useMazeGame } from "../hooks/useMazeGame";

const MazeGameLayout = () => {
  const maze = useMazeGame();

  return (
    <div className="relative min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-0">
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
