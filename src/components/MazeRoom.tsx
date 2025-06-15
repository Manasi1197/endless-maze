
import { Puzzle } from "lucide-react";

const MazeRoom = ({
  room,
  progress,
  total,
}: {
  room: { id: number; title: string; description: string };
  progress: number;
  total: number;
}) => {
  return (
    <div className="flex flex-col h-full items-center justify-center animate-fade-in scale-95 animate-scale-in">
      <div className="flex items-center mb-8">
        <span className="bg-indigo-900 text-indigo-300 p-3 rounded-full shadow-lg mr-3">
          <Puzzle size={44} />
        </span>
        <span className="text-3xl font-bold text-indigo-200 tracking-wide drop-shadow">
          Room {room.id}: {room.title}
        </span>
      </div>
      <div className="w-full max-w-lg mb-8 text-indigo-100 text-center text-lg font-medium bg-indigo-900/80 rounded-xl p-7 shadow-lg transition-all duration-300">
        {room.description}
      </div>
      <div className="w-full flex flex-col items-center gap-2 mt-auto">
        <div className="w-64 bg-indigo-800 rounded-full h-3 mb-2 overflow-hidden">
          <div
            className="bg-indigo-400 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(progress / total) * 100}%` }}
          ></div>
        </div>
        <div className="text-indigo-300 text-xs tracking-widest">
          Progress: Room {progress} of {total}
        </div>
      </div>
    </div>
  );
};
export default MazeRoom;
