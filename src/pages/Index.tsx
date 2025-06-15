import MazeGameLayout from "@/components/MazeGameLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Github, Mail } from "lucide-react";
import { useState } from "react";
import { generatePuzzle } from "@/utils/generatePuzzle";

export default function Index() {
  const [puzzle, setPuzzle] = useState<{ riddle: string; answer: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
                Descend into infinite user-created puzzle mazes. Can you reach the
                deepest level?
              </p>
            </div>
            <div className="flex gap-4">
              <Button size="lg">Play Now</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-lg mx-auto mt-10 bg-white/10 rounded-xl p-6 border border-cyan-500 shadow-xl">
        <h2 className="text-xl font-bold text-cyan-100 mb-2">Try an AI-Generated Puzzle!</h2>
        <button
          className="px-4 py-2 bg-cyan-600 rounded-lg text-white font-bold mb-3 disabled:opacity-60"
          onClick={async () => {
            setLoading(true);
            setPuzzle(null);
            setError(null);
            try {
              const res = await generatePuzzle("Give me a new riddle or logic puzzle for Maze Mind, and its answer.");
              setPuzzle(res);
            } catch (e: any) {
              setError(e.message || "Failed to generate puzzle.");
            }
            setLoading(false);
          }}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Puzzle"}
        </button>
        {error && <div className="text-red-400 mt-2">{error}</div>}
        {puzzle && (
          <div className="mt-4">
            <div className="font-semibold text-cyan-200 mb-1">Riddle:</div>
            <div className="bg-cyan-900 rounded p-3 text-cyan-100">{puzzle.riddle}</div>
            <div className="font-semibold text-lime-300 mt-3">Answer:</div>
            <div className="bg-lime-900 rounded p-3 text-lime-200">{puzzle.answer}</div>
          </div>
        )}
      </div>

      <MazeGameLayout />
    </div>
  );
}
