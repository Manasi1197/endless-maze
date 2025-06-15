
/**
 * Calls the Supabase Edge Function to get a new AI-generated puzzle.
 */
export async function generatePuzzle(prompt: string) {
  const res = await fetch(
    "https://ctondxwcblonedkfpijg.functions.supabase.co/generate-puzzle",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    }
  );
  if (!res.ok) throw new Error((await res.json()).error || "API error");
  return res.json(); // {riddle: string, answer: string}
}
