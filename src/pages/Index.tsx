
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export default function Index() {
  const { user, initialized } = useAuthUser();
  const { data: userProgress } = useUserProgress(user?.id);
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    navigate("/auth");
    setLoggingOut(false);
  };

  return (
    <div>
      <section className="w-full min-h-screen flex flex-col items-center justify-center pt-20 pb-32">
        <div className="container px-4 md:px-6 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">Endless Maze</h1>
          <p className="max-w-xl text-gray-500 text-lg md:text-2xl mb-8 text-center">
            Descend into infinite user-created puzzle mazes. Can you reach the deepest level?
          </p>
          {/* Auth bar shown above game */}
          <div className="flex flex-col gap-4 items-center justify-center">
            {!initialized ? (
              <span className="text-cyan-200">Checking auth...</span>
            ) : user ? (
              <>
                <span className="text-cyan-200 text-base flex flex-col md:flex-row md:items-center gap-2">
                  Signed in as <span className="font-bold">{user.email}</span>
                  {userProgress && (
                    <span className="ml-2 text-lime-300 bg-lime-900/50 px-2 rounded font-mono">
                      Highest Level: {userProgress.level_reached}
                    </span>
                  )}
                </span>
                <Button size="sm" variant="outline" onClick={handleLogout} disabled={loggingOut}>
                  {loggingOut ? "Logging out..." : "Log out"}
                </Button>
              </>
            ) : (
              <Link to="/auth" tabIndex={-1}>
                <Button size="lg" className="w-52">Login / Signup</Button>
              </Link>
            )}
            <Button
              size="lg"
              className="w-52"
              onClick={() => navigate("/play")}
            >
              Play Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
