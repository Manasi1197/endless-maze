
import { useState, useCallback } from "react";

type MazeRoom = {
  id: number;
  title: string;
  description: string;
  puzzle: string;
  answer: string;
};

type ChatMsg = { role: "user" | "guide"; content: string; };

const rooms: MazeRoom[] = [
  {
    id: 1,
    title: "The Neon Gate",
    description: "You stand before a shimmering digital portal. Beyond, misty corridors wriggle into darkness. The Guide awaits…",
    puzzle: `Riddle: “I am not alive, but I can grow; I don't have eyes, but I will show; The more you use me, the bigger I get—what am I?”`,
    answer: "number" // Actually, let's allow smart answer handling for MVP
  },
  {
    id: 2,
    title: "Chamber of Echoes",
    description: "Walls pulse with cryptic symbols. Faint hints drift in the air.",
    puzzle: `Logic puzzle: “Take one out and scratch my head, I am now black but once was red. What am I?”`,
    answer: "matchstick"
  },
  {
    id: 3,
    title: "Hall of Mirrors",
    description: "You’re surrounded by infinite reflections, but which one is real?",
    puzzle: `Story choice: “You see two paths reflected. One is shimmering blue, the other is a blur of gold. Which do you choose?”`,
    answer: "choice"
  },
];

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[.?!]/g, "");
}

export function useMazeGame() {
  const [current, setCurrent] = useState(0); // index in rooms[]
  const [progress, setProgress] = useState(1);
  const [chat, setChat] = useState<ChatMsg[]>([
    {
      role: "guide",
      content:
        "Welcome to the Digital Maze. I am your cryptic Guide. 🧩 Can you reach the heart of the maze? Let's begin!",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [guideTyping, setGuideTyping] = useState(false);

  // Simple "memory" of user tones and choices
  const [playerStyle, setPlayerStyle] = useState<null | "playful" | "grumpy" | "clever">(null);

  const room = rooms[current];
  const total = rooms.length;

  // On first puzzle
  if (chat.length === 1 && chat[0].role === "guide") {
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { role: "guide", content: "First challenge: " + room.puzzle },
      ]);
    }, 800);
  }

  // Simulated AI response (stub: in practice, call OpenAI API)
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

      // Puzzle/answer logic MVP
      const answerNorm = normalize(room.answer);
      let correct = false;
      if (answerNorm === "number") {
        correct = msgNorm.includes("shadow"); // intended answer is "shadow"
      } else if (answerNorm === "matchstick") {
        correct = msgNorm.includes("matchstick") || msgNorm.includes("match");
      } else if (answerNorm === "choice") {
        correct = msgNorm.includes("blue") || msgNorm.includes("gold");
      }

      // Simulate AI delay + response
      setTimeout(() => {
        let res = "";

        if (correct) {
          res =
            style === "playful"
              ? "Haha, you cracked it with style! Well done…"
              : style === "grumpy"
              ? "Even in a foul mood, you solve my riddles! Advance…"
              : "Correct! You may proceed deeper.";
          // Next room
          if (current < total - 1) {
            setChat((prev) => [
              ...prev,
              { role: "guide", content: res },
              {
                role: "guide",
                content: `You phase to the next room...`,
              },
            ]);
            setTimeout(() => {
              setCurrent((i) => i + 1);
              setProgress((p) => p + 1);
              setChat((prev) => [
                ...prev,
                {
                  role: "guide",
                  content: `Room ${rooms[current + 1].id}: ${rooms[current + 1].title}`,
                },
                {
                  role: "guide",
                  content: rooms[current + 1].puzzle,
                },
              ]);
            }, 1250);
          } else {
            setChat((prev) => [
              ...prev,
              { role: "guide", content: res },
              {
                role: "guide",
                content: "You've reached the heart of the maze! You win! 🎉",
              },
            ]);
          }
        } else {
          // Difficulty/tone response
          if (style === "grumpy") {
            res =
              "Tsk tsk, attitude won't help you. Here's a barely helpful hint: I'm seen in the dark.";
          } else if (style === "playful") {
            res =
              "Alright, I might drop a giggle and a hint: Look behind you! (It's not there, but think of shadows.)";
          } else if (style === "clever") {
            res =
              "Overthinking? Sometimes the answer lurks close to the obvious.";
          } else {
            res =
              "Incorrect. Would you like a hint? Or try again?";
          }
          setChat((prev) => [
            ...prev,
            { role: "guide", content: res },
          ]);
        }

        setGuideTyping(false);
        setIsLoading(false);
      }, 1200 + Math.floor(Math.random() * 600));
    },
    [room, playerStyle, current, total]
  );

  return {
    room,
    progress,
    total,
    chat,
    userInput,
    setUserInput,
    sendMessage,
    isLoading,
    guideTyping,
  };
}
