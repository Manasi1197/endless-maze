import { useState } from "react";
import { generateRandomPuzzle, levelThemes } from "../utils/mazeUtils";

export type MazeRoom = {
  id: number;
  title: string;
  description: string;
  puzzle: string;
  answer: string;
  theme: string;
};

// Initial rooms, used for level 1
const initialRooms: MazeRoom[] = [
  {
    id: 1,
    title: "The Neon Gate",
    description: "You stand before a shimmering digital portal. Beyond, misty corridors wriggle into darkness. The Guide awaits…",
    puzzle: `Riddle: “I am not alive, but I can grow; I don't have eyes, but I will show; The more you use me, the bigger I get—what am I?”`,
    answer: "shadow",
    theme: "neon"
  },
  {
    id: 2,
    title: "Chamber of Echoes",
    description: "Walls pulse with cryptic symbols. Faint hints drift in the air.",
    puzzle: `Logic puzzle: “Take one out and scratch my head, I am now black but once was red. What am I?”`,
    answer: "matchstick",
    theme: "echo"
  },
  {
    id: 3,
    title: "Hall of Mirrors",
    description: "You’re surrounded by infinite reflections, but which one is real?",
    puzzle: `Riddle: “What has cities, but no houses; forests, but no trees; and water, but no fish?”`,
    answer: "map",
    theme: "mirror"
  },
];

function createLevelRooms(level: number): MazeRoom[] {
  if (level === 1) return initialRooms.slice();
  const themeNames = Object.keys(levelThemes);
  const theme = themeNames[(level-1)%themeNames.length];
  return [1,2,3].map((n) => generateRandomPuzzle((level-1)*3 + n, theme));
}

export function useMazeRooms() {
  const [level, setLevel] = useState(1);
  const [rooms, setRooms] = useState<MazeRoom[]>(initialRooms.slice());
  const [roomIdx, setRoomIdx] = useState(0);
  const [roomSolved, setRoomSolved] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);

  const room = rooms[roomIdx];

  function advanceRoom() {
    if (roomIdx < rooms.length - 1) {
      setRoomIdx(i => i + 1);
      setRoomSolved(false);
      // Removed the logic that sets levelComplete here
    }
    // Do not set levelComplete here anymore
  }

  function advanceLevel() {
    const newLevel = level + 1;
    const newRooms = createLevelRooms(newLevel);
    setLevel(newLevel);
    setRooms(newRooms);
    setRoomIdx(0);
    setRoomSolved(false);
    setLevelComplete(false);
  }

  function markRoomSolved() {
    setRoomSolved(true);
    if (roomIdx === rooms.length - 1) setLevelComplete(true);
  }

  return {
    level, rooms, roomIdx, room,
    progress: roomIdx+1,
    total: rooms.length,
    roomSolved,
    markRoomSolved,
    advanceRoom,
    levelComplete,
    advanceLevel,
  };
}
