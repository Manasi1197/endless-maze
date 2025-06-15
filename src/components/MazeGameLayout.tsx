
import MazeRoom from "./MazeRoom";
import MazeChat from "./MazeChat";

// Layout: Two columns, left = room view, right = chat/puzzle
const MazeGameLayout = () => (
  <div className="min-h-screen w-full grid grid-cols-2 gap-0 bg-gradient-to-br from-indigo-950 via-gray-900 to-indigo-800">
    <div className="flex flex-col justify-between items-stretch p-10 border-r border-indigo-800">
      <MazeRoom />
    </div>
    <div className="flex flex-col justify-end h-screen max-h-screen p-0">
      <MazeChat />
    </div>
  </div>
);
export default MazeGameLayout;
