
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-indigo-950 flex flex-col items-center justify-center px-4">
      <section className="w-full max-w-xl flex flex-col items-center shadow-xl rounded-xl bg-white/10 border border-cyan-700 p-8 md:p-12 mt-10 mb-10">
        {/* SVG illustration hero */}
        <div className="mb-6 flex justify-center">
          <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-md">
            <rect x="5" y="5" width="90" height="90" rx="18" fill="#0ea5e9" fillOpacity="0.6" />
            <path d="M35 35H65V65H35V35Z" stroke="#fff" strokeWidth="5" />
            <path d="M25 50H35M65 50H75" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="50" cy="50" r="6" fill="#22d3ee" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-3 tracking-tight drop-shadow">
          Endless Maze
        </h1>
        <p className="max-w-xl text-cyan-100 text-base md:text-lg mb-7 text-center font-medium">
          Descend into infinite user-created puzzle mazes.<br />Can you reach the deepest level?
        </p>
        {/* Auth bar above game */}
        <div className="w-full flex flex-col gap-5 items-center">
          {!initialized ? (
            <span className="text-cyan-200">Checking auth...</span>
          ) : user ? (
            <>
              <span className="text-cyan-100 text-base flex flex-col md:flex-row md:items-center gap-2">
                Signed in as <span className="font-bold">{user.email}</span>
                {userProgress && (
                  <span className="ml-2 text-lime-300 bg-lime-900/50 px-2 rounded font-mono text-xs">
                    Highest Level: {userProgress.level_reached}
                  </span>
                )}
              </span>
              <Button size="sm" variant="outline" onClick={handleLogout} disabled={loggingOut}>
                {loggingOut ? "Logging out..." : "Log out"}
              </Button>
            </>
          ) : (
            <Link to="/auth" tabIndex={-1} className="w-full">
              <Button size="lg" className="w-full font-bold">
                Login / Signup
              </Button>
            </Link>
          )}
          <Button
            size="lg"
            className="w-full font-bold bg-lime-500 hover:bg-lime-600 text-lime-950 mt-2"
            onClick={() => navigate("/play")}
          >
            Play Now
          </Button>
        </div>
        <div className="mt-8 w-full flex justify-center">
          <span className="text-xs text-cyan-100/90 text-center">
            Your progress is saved if you sign in<br />
            or play as a guest to try puzzles instantly!
          </span>
        </div>
      </section>
      <footer className="mt-auto mb-4 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Endless Maze. Built with 💡
      </footer>
    </div>
  );
}
