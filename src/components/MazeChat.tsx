
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
  roomIdx?: number;
  finished?: boolean;
};

const chatThemes = [
  {
    inputGlow: "focus:ring-cyan-400 border-cyan-600",
    sendBtn: "bg-cyan-600 hover:bg-cyan-400 active:bg-cyan-700",
    place: "placeholder-cyan-200/60",
  },
  {
    inputGlow: "focus:ring-pink-300 border-pink-500",
    sendBtn: "bg-pink-600 hover:bg-pink-400 active:bg-pink-700",
    place: "placeholder-pink-200/60",
  },
  {
    inputGlow: "focus:ring-yellow-200 border-yellow-500",
    sendBtn: "bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-gray-900 font-bold",
    place: "placeholder-yellow-100/70",
  },
];

const MazeChat = ({
  chat,
  userInput,
  setUserInput,
  sendMessage,
  isLoading,
  guideTyping,
  roomIdx = 0,
  finished = false
}: MazeChatProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const theme = chatThemes[roomIdx % chatThemes.length];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, guideTyping]);

  return (
    <div className="h-full flex flex-col pt-6 pb-5 px-2 md:px-6 glass-chat rounded-none md:rounded-bl-2xl shadow-2xl backdrop-blur-xl">
      {/* Chat header */}
      <div className="flex items-center mb-3 select-none">
        <span className="bg-[#222e52ad] text-[#9cc6fb] p-2 rounded-full mr-3 shadow-md ring-1 ring-indigo-700/50">
          <Puzzle size={28} />
        </span>
        <span className="font-bold text-indigo-200 text-xl drop-shadow-sm font-mono tracking-wide">
          Maze Guide
        </span>
      </div>
      {/* Messages */}
      <div
        ref={scrollRef}
        className={cn(
          "flex-1 min-h-0 overflow-y-auto custom-scrollbar pb-2 transition-all",
          "bg-indigo-950/80 rounded-lg p-3 shadow-inner mb-3 border border-indigo-800/40 backdrop-blur-lg glass-chat-inner"
        )}
        style={{ minHeight: 0 }}
      >
        {chat.map((msg, idx) =>
          msg.role === "user" ? (
            <UserBubble key={idx} text={msg.content} idx={roomIdx} />
          ) : (
            <PuzzleBubble key={idx} text={msg.content} idx={roomIdx} />
          )
        )}
        {guideTyping && (
          <div className="flex gap-2 items-center animate-fade-in mt-2 ml-2">
            <span className={cn(
              "animate-pulse w-2 h-2 rounded-full bg-cyan-400",
              roomIdx === 1 && "bg-pink-300",
              roomIdx === 2 && "bg-yellow-300"
            )}></span>
            <span className={cn(
              "w-2 h-2 rounded-full opacity-70 animate-pulse bg-cyan-400",
              roomIdx === 1 && "bg-pink-300",
              roomIdx === 2 && "bg-yellow-300"
            )}></span>
            <span className={cn(
              "w-2 h-2 rounded-full opacity-40 animate-pulse bg-cyan-400",
              roomIdx === 1 && "bg-pink-300",
              roomIdx === 2 && "bg-yellow-300"
            )}></span>
            <span className={cn("font-semibold",
              roomIdx === 1 ? "text-pink-200" :
              roomIdx === 2 ? "text-yellow-200" : "text-cyan-200"
            )}>Guide is typing…</span>
          </div>
        )}
      </div>
      {/* Input */}
      <form
        className="flex items-center gap-2 border-t border-indigo-800/40 pt-3"
        onSubmit={e => {
          e.preventDefault();
          if (!userInput.trim()) return;
          sendMessage(userInput.trim());
        }}
      >
        <input
          className={cn(
            "w-full glass-input bg-[#171b25]/90 text-lg text-cyan-100 px-5 py-2 rounded-xl border transition-all focus:outline-none",
            theme.inputGlow,
            theme.place,
            isLoading && "opacity-60"
          )}
          type="text"
          autoFocus
          spellCheck
          maxLength={300}
          disabled={isLoading || finished}
          value={userInput}
          placeholder={finished ? "Maze completed!" : "Type your answer or ask the guide…"}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !isLoading && userInput.trim()) {
              sendMessage(userInput.trim());
            }
          }}
        />
        <button
          disabled={isLoading || !userInput.trim() || finished}
          type="submit"
          className={cn(
            "px-6 py-2 rounded-xl shadow-lg transition-all duration-150 focus:ring-2 focus:ring-offset-2 font-bold",
            theme.sendBtn,
            (!userInput.trim() || isLoading || finished) && "opacity-70 cursor-not-allowed"
          )}
        >
          Send
        </button>
      </form>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar { width: 9px; }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg,#5c7aff33 20%, #7ee9fd33 100%);
            border-radius: 6px;
          }
          .glass-chat { background: linear-gradient(110deg,rgba(41,56,88,0.59),rgba(30,34,46,0.92)); }
          .glass-input { box-shadow: 0 4px 32px 2px #10AFC439, 0 1.5px 4px #0006; font-family: 'JetBrains Mono', 'SFMono-Regular', Monospace; letter-spacing: .01em; }
          .glass-card, .glass-chat-inner { box-shadow: 0 6px 36px #7ee9fd24,0 2.5px 6px #0003; }
        `}
      </style>
    </div>
  );
};

export default MazeChat;
