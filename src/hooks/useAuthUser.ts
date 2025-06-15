
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

// Returns the current user and session, and auth-status synced to Supabase state
export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Subscribe to auth state changes FIRST
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setUser(sess?.user ?? null);
      setSession(sess ?? null);
      setInitialized(true);
    });
    // Check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setSession(session ?? null);
      setInitialized(true);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  return { user, session, initialized };
}
