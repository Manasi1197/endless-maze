
import { cn } from "@/lib/utils";

const UserBubble = ({ text }: { text: string }) => (
  <div className={cn(
    "flex items-start justify-end mb-3 animate-fade-in"
  )}>
    <div className="bg-indigo-600/90 text-white px-4 py-2 rounded-xl rounded-tr-sm max-w-lg ml-auto shadow border border-indigo-500">
      {text}
    </div>
  </div>
);
export default UserBubble;
