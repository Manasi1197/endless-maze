
-- Enable Row Level Security (RLS) policies after table creation
-- Table to store the level reached by each authenticated user
CREATE TABLE public.user_progress (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  level_reached integer NOT NULL DEFAULT 1
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Allow each user to read and update their own progress
CREATE POLICY "Allow user read access to their progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Allow user to insert their own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow user to update their own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);

