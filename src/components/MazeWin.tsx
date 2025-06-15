
import { CircleCheck } from "lucide-react";

const MazeWin = () => (
  <div className="flex flex-col items-center justify-center h-full animate-fade-in">
    <CircleCheck className="text-green-400 drop-shadow mb-6" size={80} />
    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-green-200 drop-shadow">
      🎉 You Escaped the Maze!
    </h2>
    <p className="text-indigo-200 mt-2 mb-6 text-xl text-center max-w-md">
      You solved every riddle, outsmarted the Maze Guide, and reached the digital core. <br />
      <span className="text-green-300 font-semibold">Well done, maze master!</span>
    </p>
    <div className="mt-8 mb-4 text-sm text-indigo-400 opacity-70">
      (Restart the page if you wish to play again.)
    </div>
  </div>
);

export default MazeWin;
