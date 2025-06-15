
import { useEffect, useRef } from "react";
import PuzzleBubble from "./PuzzleBubble";
import UserBubble from "./UserBubble";
import { Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

type MazeChatProps = {
  chat: { role: "user" | "guide"; content: string }[];
  userInput: string;
  setUserInput: (val: string) => void;
  sendMessage: (msg: string) => void;
  isLoading: boolean;
  guideTyping: boolean;
  isMobile?: boolean;
  roomSolved?: boolean;
  advanceRoom?: () => void;
  levelComplete?: boolean;
  advanceLevel?: () => void;
  level?: number;
};

const MazeChat = ({
  chat,
  userInput,
  setUserInput,
  sendMessage,
  isLoading,
  guideTyping,
  isMobile,
  roomSolved,
  advanceRoom,
  levelComplete,
  advanceLevel,
  level,
}: MazeChatProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, guideTyping]);

  return (
    <div className={cn(
      "h-full flex flex-col pt-3 sm:pt-8 pb-3 sm:pb-8 px-1 sm:px-6",
      isMobile && "pb-[76px] sm:pb-8" // Add space for button if showing
    )}>
      {/* Chat header */}
      <div className={cn(
        "flex items-center mb-2 sm:mb-4 select-none",
        isMobile ? "mb-1" : "mb-2 sm:mb-4"
      )}>
        <span className="bg-indigo-900 text-indigo-300 p-1.5 sm:p-2 rounded-full mr-1 sm:mr-3 shadow-md">
          <Puzzle size={17} className="sm:size-[28px]" />
        </span>
        <span className="font-semibold text-indigo-200 text-base sm:text-xl drop-shadow-sm">
          Maze Guide
        </span>
      </div>
      {/* Messages */}
      <div
        ref={scrollRef}
        className={cn(
          "flex-1 overflow-y-auto custom-scrollbar pb-1.5 transition-all",
          "bg-indigo-950/80 rounded-lg p-1.5 sm:p-4 shadow-inner mb-2 sm:mb-3 border border-indigo-800"
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
          <div className="flex gap-2 items-center animate-fade-in mt-2 ml-1">
            <span className="animate-pulse w-2 h-2 bg-indigo-400 rounded-full"></span>
            <span className="w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-pulse"></span>
            <span className="w-2 h-2 bg-indigo-400 rounded-full opacity-40 animate-pulse"></span>
            <span className="text-indigo-400 text-base font-semibold">Guide is typing…</span>
          </div>
        )}
      </div>
      {/* Input */}
      <form
        className="flex items-center gap-2 border-t border-indigo-800 pt-2 sm:pt-4"
        onSubmit={e => {
          e.preventDefault();
          if (!userInput.trim()) return;
          sendMessage(userInput.trim());
        }}
      >
        <input
          className={cn(
            "w-full bg-indigo-900 text-indigo-100 border border-indigo-700 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-60 text-sm sm:text-base",
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
            "px-2 py-1.5 sm:px-5 sm:py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-md transition-all text-xs sm:text-base",
            (!userInput.trim() || isLoading) && "opacity-70 cursor-not-allowed"
          )}
        >
          Send
        </button>
      </form>
      {/* Mobile progression buttons at the bottom */}
      {isMobile && (roomSolved || levelComplete) && (
        <div
          className="fixed bottom-2 left-0 w-full flex justify-center items-end z-50 pointer-events-none"
        >
          <div className={cn(
            "pointer-events-auto px-2",
            // animate and spacing mobile
          )}>
            {roomSolved && !levelComplete && (
              <button
                className="w-full max-w-xs mx-auto animate-fade-in mb-0 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-2xl text-base font-bold shadow-2xl transition-all hover:scale-105"
                onClick={advanceRoom}
              >
                Next Room &rarr;
              </button>
            )}
            {levelComplete && (
              <div className="flex flex-col items-center justify-center animate-fade-in mt-1 drop-shadow-lg">
                <span className="text-lg drop-shadow-glow font-extrabold text-yellow-300 animate-pulse mb-1">
                  🎉 Congratulations!
                </span>
                <span className="text-sm text-white/80 mb-2 font-semibold">
                  You completed Level {level}
                </span>
                <button
                  className="w-full max-w-xs animate-fade-in px-4 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-2xl text-base font-bold shadow-2xl transition-all hover:scale-105"
                  onClick={advanceLevel}
                >
                  Next Level &darr;
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #3c366b;
            border-radius: 4px;
          }

          @media (max-width: 640px) {
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          }
        `}
      </style>
    </div>
  );
};

export default MazeChat;
