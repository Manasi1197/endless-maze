
import MazeRoom from "./MazeRoom";
import MazeWin from "./MazeWin";
import MazeChat from "./MazeChat";
import { useMazeGame } from "../hooks/useMazeGame";

// List for accent bg gradient per room for visual difference
const bgGradients = [
  "from-indigo-950 via-gray-900 to-indigo-800", // Room 1
  "from-blue-900 via-indigo-900 to-stone-800",   // Room 2
  "from-yellow-900 via-yellow-700 to-amber-900"  // Room 3
];

// Layout: Two columns, left = room view, right = chat/puzzle
const MazeGameLayout = () => {
  const maze = useMazeGame();
  const finished = maze.progress > maze.total;

  // Select gradient based on room/index (but when winning, use special)
  const bgGradient = finished
    ? "from-green-950 via-green-800 to-indigo-900"
    : bgGradients[(maze.progress - 1) % bgGradients.length];

  return (
    <div className={`min-h-screen w-full grid grid-cols-2 gap-0 bg-gradient-to-br ${bgGradient} transition-colors duration-700`}>
      <div className="flex flex-col justify-between items-stretch p-10 border-r border-indigo-800">
        {finished ? (
          <MazeWin />
        ) : (
          <MazeRoom
            room={maze.room}
            progress={maze.progress}
            total={maze.total}
            key={maze.room.id /* force mount for animation */}
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
        />
      </div>
    </div>
  );
};
export default MazeGameLayout;
