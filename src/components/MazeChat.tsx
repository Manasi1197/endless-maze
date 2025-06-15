
import { useEffect, useRef } from "react";
import { useMazeGame } from "../hooks/useMazeGame";
import PuzzleBubble from "./PuzzleBubble";
import UserBubble from "./UserBubble";
import { Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

const MazeChat = () => {
  const { chat, userInput, setUserInput, sendMessage, isLoading, guideTyping } = useMazeGame();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, guideTyping]);

  return (
    <div className="h-full flex flex-col pt-10 pb-8 px-6">
      {/* Chat header */}
      <div className="flex items-center mb-4 select-none">
        <span className="bg-indigo-900 text-indigo-300 p-2 rounded-full mr-3 shadow-md">
          <Puzzle size={28} />
        </span>
        <span className="font-semibold text-indigo-200 text-xl drop-shadow-sm">
          Maze Guide
        </span>
      </div>
      {/* Messages */}
      <div
        ref={scrollRef}
        className={cn(
          "flex-1 overflow-y-auto custom-scrollbar pb-2 transition-all",
          "bg-indigo-950/80 rounded-lg p-4 shadow-inner mb-3 border border-indigo-800"
        )}
        style={{ minHeight: 0 }}
      >
        {chat.map((msg, idx) =>
          msg.role === "user" ? (
            <UserBubble key={idx} text={msg.content} />
          ) : (
            <PuzzleBubble key={idx} text={msg.content} />
          )
        )}
        {guideTyping && (
          <div className="flex gap-2 items-center animate-fade-in mt-2 ml-2">
            <span className="animate-pulse w-2 h-2 bg-indigo-400 rounded-full"></span>
            <span className="w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-pulse"></span>
            <span className="w-2 h-2 bg-indigo-400 rounded-full opacity-40 animate-pulse"></span>
            <span className="text-indigo-400 text-base font-semibold">Guide is typing…</span>
          </div>
        )}
      </div>
      {/* Input */}
      <form
        className="flex items-center gap-2 border-t border-indigo-800 pt-4"
        onSubmit={e => {
          e.preventDefault();
          if (!userInput.trim()) return;
          sendMessage(userInput.trim());
        }}
      >
        <input
          className={cn(
            "w-full bg-indigo-900 text-indigo-100 border border-indigo-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-60",
            isLoading && "opacity-60"
          )}
          type="text"
          autoFocus
          spellCheck
          maxLength={300}
          disabled={isLoading}
          value={userInput}
          placeholder="Type your answer or ask the guide…"
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !isLoading && userInput.trim()) {
              sendMessage(userInput.trim());
            }
          }}
        />
        <button
          disabled={isLoading || !userInput.trim()}
          type="submit"
          className={cn(
            "px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-md transition-all",
            (!userInput.trim() || isLoading) && "opacity-70 cursor-not-allowed"
          )}
        >
          Send
        </button>
      </form>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #3c366b;
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  );
};
export default MazeChat;
