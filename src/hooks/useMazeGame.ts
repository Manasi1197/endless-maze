
import { useState, useCallback } from "react";
import { generateRandomPuzzle, levelThemes } from "../utils/mazeUtils";

type MazeRoom = {
  id: number;
  title: string;
  description: string;
  puzzle: string;
  answer: string;
  theme: string; // NEW: identifies which theme to use
};

type ChatMsg = { role: "user" | "guide"; content: string };

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
    puzzle: `Story choice: “You see two paths reflected. One is shimmering blue, the other is a blur of gold. Which do you choose?”`,
    answer: "blue,gold", // accepts both
    theme: "mirror"
  },
];

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[.?!]/g, "");
}

export function useMazeGame() {
  // Each level has 3 steps. Begin with level 1, roomIdx 0.
  const [level, setLevel] = useState(1);
  const [roomIdx, setRoomIdx] = useState(0);
  const [rooms, setRooms] = useState<MazeRoom[]>(initialRooms.slice());
  const [chat, setChat] = useState<ChatMsg[]>([
    {
      role: "guide",
      content:
        "Welcome to the Endless Maze. I am your cryptic Guide. 🧩 Can you conquer infinite levels? Let's begin!",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [guideTyping, setGuideTyping] = useState(false);
  const [playerStyle, setPlayerStyle] = useState<null | "playful" | "grumpy" | "clever">(null);

  const totalSteps = rooms.length; // always 3 per level
  const room = rooms[roomIdx];

  // Kick off each new room with a puzzle after the guide welcomes you (debounced)
  // (reset whenever roomIdx or rooms changes)
  React.useEffect(() => {
    if (
      chat.length === 1 ||
      (chat.length && chat[chat.length-1].content.startsWith("Level"))
    ) {
      setTimeout(() => {
        setChat(prev => [
          ...prev,
          { role: "guide", content: `Level ${level} - Room ${room.id}: ${room.title}` },
          { role: "guide", content: room.puzzle }
        ]);
      }, 800);
    }
    // eslint-disable-next-line
  }, [roomIdx, rooms, level]);

  /** Called whenever a new level starts. Generates rooms for this level. */
  function createLevelRooms(nextLevel: number): MazeRoom[] {
    // Use initial rooms only for level 1.
    if (nextLevel === 1) return initialRooms.slice();
    // Procedural: 3 random new rooms themed by level
    const themeNames = Object.keys(levelThemes);
    const theme = themeNames[(nextLevel-1)%themeNames.length];
    return [1,2,3].map((n, idx) =>
      generateRandomPuzzle((nextLevel-1)*3 + n, theme)
    );
  }

  const sendMessage = useCallback(
    async (msg: string) => {
      setChat((prev) => [...prev, { role: "user", content: msg }]);
      setUserInput("");
      setGuideTyping(true);
      setIsLoading(true);

      // Detect tone / style (MVP: silly heuristic)
      let style: null | "playful" | "grumpy" | "clever" = playerStyle;
      const msgNorm = normalize(msg);

      if (!style) {
        if (msgNorm.includes("please") || msgNorm.match(/lol|haha|fun/i)) style = "playful";
        else if (msgNorm.match(/stupid|hard|hate|boring/)) style = "grumpy";
        else if (msgNorm.match(/because|logic|therefore|deduce/)) style = "clever";
        if (style) setPlayerStyle(style);
      }

      // Puzzle/answer logic
      const answerNorm = normalize(room.answer);
      let correct = false;
      if (answerNorm.includes(",")) {
        // Accept any of several answers (e.g. choice room)
        correct = answerNorm.split(",").some(ans => msgNorm.includes(ans));
      } else {
        correct = msgNorm.includes(answerNorm);
      }

      setTimeout(() => {
        let res = "";

        if (correct) {
          res = style === "playful"
            ? "Haha, you cracked it with style! Well done…"
            : style === "grumpy"
            ? "Even in a foul mood, you solve my riddles! Advance…"
            : "Correct! You may proceed deeper.";

          // If LAST room in this level, advance to next level
          if (roomIdx === rooms.length - 1) {
            setChat(prev => [
              ...prev,
              { role: "guide", content: res },
              {
                role: "guide",
                content: `LEVEL COMPLETE! 🚀`,
              },
              {
                role: "guide",
                content: `Descending to Level ${level+1}…`,
              }
            ]);
            setTimeout(() => {
              const newLevel = level + 1;
              const newRooms = createLevelRooms(newLevel);
              setLevel(newLevel);
              setRooms(newRooms);
              setRoomIdx(0);
              setChat([
                { role: "guide", content: `Welcome to Level ${newLevel}. Ready for new challenges?` }
              ]);
              setPlayerStyle(null);
            }, 1500);
          } else {
            // Advance to next room of this level
            setChat(prev => [
              ...prev,
              { role: "guide", content: res },
              {
                role: "guide",
                content: `You move to the next chamber...`,
              },
            ]);
            setTimeout(() => {
              setRoomIdx(i => i + 1);
            }, 1200);
          }
        } else {
          // Difficulty/tone response
          if (style === "grumpy") {
            res = "Tsk tsk, attitude won't help you. Here's a barely helpful hint: Think again.";
          } else if (style === "playful") {
            res = "Alright, I might drop a giggle and a hint: Use your wits!";
          } else if (style === "clever") {
            res = "Overthinking? Sometimes the answer lurks close to the obvious.";
          } else {
            res = "Incorrect. Would you like a hint? Or try again?";
          }
          setChat(prev => [
            ...prev,
            { role: "guide", content: res },
          ]);
        }

        setGuideTyping(false);
        setIsLoading(false);
      }, 1200 + Math.floor(Math.random() * 600));
    },
    [room, playerStyle, roomIdx, rooms, level]
  );

  return {
    room,
    progress: roomIdx + 1,
    total: rooms.length,
    chat,
    userInput,
    setUserInput,
    sendMessage,
    isLoading,
    guideTyping,
    level,
    theme: room.theme,
  };
}

