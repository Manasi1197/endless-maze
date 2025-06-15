
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function AuthPage() {
  const { user, initialized } = useAuthUser();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  // If already logged in, go to home
  if (initialized && user) {
    setTimeout(() => navigate("/"), 200);
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-lg">Already logged in! Redirecting...</div>
      </div>
    );
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) {
        setErr(error.message);
      } else {
        toast.success("Signed in!");
        navigate("/");
      }
      setLoading(false);
    } else {
      // Sign up mode
      const redirectUrl = `${window.location.origin}/`; // For email confirmation
      const { error } = await supabase.auth.signUp({
        email,
        password: pw,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) {
        setErr(error.message);
      } else {
        toast.success("Signup successful! Check your email for confirmation.");
        setMode("signin");
      }
      setLoading(false);
    }
  };

  // Guest play handler
  const handleGuestPlay = () => {
    toast("Playing as guest. Progress will not be saved.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-cyan-800 px-4">
      <form
        onSubmit={handleAuth}
        className="w-full max-w-md rounded-xl bg-white/10 border border-cyan-400 p-8 shadow-lg flex flex-col gap-5"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="bg-white/80"
        />
        <Input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          required
          autoComplete="current-password"
          className="bg-white/80"
        />
        <Button type="submit" className="w-full flex justify-center items-center" disabled={loading}>
          {loading && <Loader2 className="animate-spin mr-2" size={18} />}
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </Button>
        <button
          type="button"
          className="text-sm text-cyan-200 hover:underline transition"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </button>
        {err && <div className="bg-red-200/40 rounded p-2 text-red-800 text-sm">{err}</div>}
        <div className="mt-6 flex flex-col items-center">
          <div className="text-white/80 text-xs mb-2">— or —</div>
          <Button
            variant="outline"
            className="w-full font-semibold bg-white/80 hover:bg-white/90 mt-1 text-cyan-900"
            type="button"
            onClick={handleGuestPlay}
          >
            Play Now (Continue as Guest)
          </Button>
          <div className="text-[10px] mt-2 text-cyan-100/80 text-center">
            You can play as a guest, but your progress will not be saved.
          </div>
        </div>
      </form>
    </div>
  );
}
