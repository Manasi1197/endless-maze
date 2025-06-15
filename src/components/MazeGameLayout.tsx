
import MazeRoom from "./MazeRoom";
import MazeChat from "./MazeChat";
import { useMazeGame } from "../hooks/useMazeGame";

// Layout: Two columns, left = room view, right = chat/puzzle
const MazeGameLayout = () => {
  const maze = useMazeGame();

  return (
    <div className="min-h-screen w-full grid grid-cols-2 gap-0 bg-gradient-to-br from-indigo-950 via-gray-900 to-indigo-800">
      <div className="flex flex-col justify-between items-stretch p-10 border-r border-indigo-800">
        <MazeRoom room={maze.room} progress={maze.progress} total={maze.total} />
      </div>
      <div className="flex flex-col justify-end h-screen max-h-screen p-0">
        <MazeChat
          chat={maze.chat}
          userInput={maze.userInput}
          setUserInput={maze.setUserInput}
          sendMessage={maze.sendMessage}
          isLoading={maze.isLoading}
          guideTyping={maze.guideTyping}
        />
      </div>
    </div>
  );
};
export default MazeGameLayout;
