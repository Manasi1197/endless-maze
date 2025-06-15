
import { useState, useCallback, useEffect } from "react";
import { useMazeRooms } from "./useMazeRooms";
import { isCorrectAnswer, normalizeAnswer } from "../utils/mazeAnswerUtils";

// Types for chat messages
type ChatMsg = { role: "user" | "guide"; content: string };

export function useMazeGame() {
  // Core room/level/solved state in a separate hook now!
  const {
    level, rooms, roomIdx, room,
    progress, total,
    roomSolved, markRoomSolved,
    advanceRoom, levelComplete, advanceLevel,
  } = useMazeRooms();

  // Chat UI and player state
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
  const [hasShownFirstRoom, setHasShownFirstRoom] = useState(false);

  // When room or level changes, always show the appropriate messages
  useEffect(() => {
    // For the very first room, show it after the welcome message
    if (roomIdx === 0 && level === 1 && !hasShownFirstRoom) {
      setTimeout(() => {
        setChat(prev => [
          ...prev,
          { role: "guide", content: `Level ${level} - Room ${room.id}` },
          { role: "guide", content: room.puzzle },
        ]);
        setHasShownFirstRoom(true);
      }, 800);
      return;
    }
    
    // For all other room transitions
    if (hasShownFirstRoom) {
      setTimeout(() => {
        setChat([
          { role: "guide", content: `Stepping into Room ${room.id}...` },
          { role: "guide", content: `Level ${level} - Room ${room.id}` },
          { role: "guide", content: room.puzzle },
        ]);
      }, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomIdx, rooms, level, room, hasShownFirstRoom]);

  const sendMessage = useCallback(
    async (msg: string) => {
      setChat((prev) => [...prev, { role: "user", content: msg }]);
      setUserInput("");
      setGuideTyping(true);
      setIsLoading(true);

      let style: null | "playful" | "grumpy" | "clever" = playerStyle;
      const msgNorm = normalizeAnswer(msg);

      if (!style) {
        if (msgNorm.includes("please") || msgNorm.match(/lol|haha|fun/i)) style = "playful";
        else if (msgNorm.match(/stupid|hard|hate|boring/)) style = "grumpy";
        else if (msgNorm.match(/because|logic|therefore|deduce/)) style = "clever";
        if (style) setPlayerStyle(style);
      }

      let correct = isCorrectAnswer(msg, room.answer);

      setTimeout(() => {
        if (correct && !roomSolved) {
          let res = "";
          res = style === "playful"
            ? "Haha, you cracked it with style! Well done…"
            : style === "grumpy"
            ? "Even in a foul mood, you solve my riddles! Advance…"
            : "Correct! You may proceed deeper.";
          setChat(prev => [
            ...prev,
            { role: "guide", content: res },
            {
              role: "guide",
              content:
                (roomIdx === rooms.length - 1)
                  ? "LEVEL COMPLETE! 🚀 Click 'Next Level' to descend!"
                  : "Click 'Next Room' to go onward!",
            },
          ]);
          markRoomSolved();
        } else if (!correct) {
          let res = "";
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
    [room, playerStyle, roomIdx, rooms, level, roomSolved, markRoomSolved]
  );

  // On level progression, welcome again (Level > 1 and 1st room)
  useEffect(() => {
    if (level > 1 && roomIdx === 0 && !levelComplete) {
      setChat([
        { role: "guide", content: `Welcome to Level ${level}! New mysteries await...` },
        { role: "guide", content: `Level ${level} - Room ${room.id}` },
        { role: "guide", content: room.puzzle },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, roomIdx, room, levelComplete]);

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
    level,
    theme: room.theme,
    roomSolved,
    advanceRoom,
    levelComplete,
    advanceLevel,
  };
}
