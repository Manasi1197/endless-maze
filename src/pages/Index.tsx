import MazeGameLayout from "@/components/MazeGameLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Github, Mail } from "lucide-react";
import { useState } from "react";
import { generatePuzzle } from "@/utils/generatePuzzle";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const [puzzle, setPuzzle] = useState<{ riddle: string; answer: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, initialized } = useAuthUser();
  const { data: userProgress, updateLevel } = useUserProgress(user?.id);
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div>
      <section className="w-full pt-12 md:pt-24 lg:pt-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Endless Maze
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Descend into infinite user-created puzzle mazes. Can you reach the deepest level?
              </p>
            </div>
            {/* Auth bar shown above game */}
            <div className="flex gap-4 items-center justify-center mt-3 mb-1">
              {!initialized ? (
                <span className="text-cyan-200">Checking auth...</span>
              ) : user ? (
                <>
                  <span className="text-cyan-200 text-sm flex items-center gap-2">
                    Signed in as <span className="font-bold">{user.email}</span>
                    {userProgress && (
                      <span className="ml-2 text-lime-300 bg-lime-900/50 px-2 rounded font-mono">
                        Highest Level: {userProgress.level_reached}
                      </span>
                    )}
                  </span>
                  <Button size="sm" variant="outline" onClick={handleLogout}>
                    Log out
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button size="sm">Login / Signup</Button>
                </Link>
              )}
            </div>
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={() => {
                  // For guests: just go to maze as guest (progress isn't stored if not authenticated)
                  navigate("/");
                }}
              >
                Play Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* MazeGameLayout always shown */}
      <MazeGameLayout />
    </div>
  );
}
