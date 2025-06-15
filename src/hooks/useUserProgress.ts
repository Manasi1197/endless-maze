
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetch the user's progress record, i.e., their highest level reached.
 */
export function useUserProgress(userId?: string | null) {
  const queryClient = useQueryClient();

  // Query for the current user's progress (if logged in)
  const query = useQuery({
    queryKey: ["user_progress", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  // Mutation for upserting (insert or update) the record
  const upsertMutation = useMutation({
    mutationFn: async (newLevel: number) => {
      if (!userId) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("user_progress")
        .upsert({ user_id: userId, level_reached: newLevel }, { onConflict: "user_id" })
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_progress", userId] });
    }
  });

  return { ...query, updateLevel: upsertMutation.mutateAsync };
}
