
/** Utility for random puzzles & level themes */
const puzzleTemplates = [
  {
    template: "Riddle: “I have keys but open no locks. What am I?”",
    answer: "piano",
  },
  {
    template: "Puzzle: “I run but never walk, have a mouth but never talk. What am I?”",
    answer: "river",
  },
  {
    template: "Mystery: “Feed me and I live. Give me a drink and I die. What am I?”",
    answer: "fire",
  },
  {
    template: "Sequence: “What comes next? 2, 4, 8, 16, ?”",
    answer: "32",
  },
  {
    template: "Wordplay: “What five-letter word stays the same when you take away the first, third, and last letter?”",
    answer: "empty",
  },
  {
    template: "Logic: “What is so fragile that saying its name breaks it?”",
    answer: "silence",
  },
  {
    template: "Choice: “Left or Right? Only one is correct in this endless labyrinth.”",
    answer: "left,right" // accept either
  },
  {
    template: "Story: “You're given two doors: one labeled Past, one Future. Which do you choose?”",
    answer: "past,future"
  }
];

// Simple cyclical color+effect themes for different levels.
export const levelThemes: Record<string, {
  gradient: string,    // Tailwind classes for gradient bg on left
  card: string,        // Card or glassy effect style
  accent: string,      // Accent e.g. progress bar color
}> = {
  neon: {
    gradient: "from-purple-900 via-indigo-900 to-cyan-600",
    card: "bg-white/10 border-cyan-400 shadow-[0_0_30px_#1e293bb3] backdrop-blur-xl",
    accent: "bg-cyan-400",
  },
  desert: {
    gradient: "from-yellow-100 via-yellow-400 to-orange-600",
    card: "bg-orange-50/30 border-orange-300 shadow-[0_0_30px_#f59e4255] backdrop-blur-md",
    accent: "bg-orange-400",
  },
  forest: {
    gradient: "from-emerald-800 via-green-800 to-teal-500",
    card: "bg-green-800/40 border-lime-400 shadow-[0_0_30px_#10b98166] backdrop-blur-xl",
    accent: "bg-lime-400",
  },
  shadow: {
    gradient: "from-zinc-900 via-stone-800 to-violet-900",
    card: "bg-neutral-900/30 border-violet-700 shadow-[0_0_30px_#6d28d9bb] backdrop-blur-xl",
    accent: "bg-violet-500",
  },
  aurora: {
    gradient: "from-green-400 via-fuchsia-500 to-blue-600",
    card: "bg-fuchsia-900/20 border-fuchsia-400 shadow-[0_0_30px_#a21caf66] backdrop-blur-md",
    accent: "bg-fuchsia-400",
  },
  steel: {
    gradient: "from-gray-700 via-zinc-700 to-sky-400",
    card: "bg-sky-800/30 border-sky-400 shadow-[0_0_30px_#38bdf855] backdrop-blur-lg",
    accent: "bg-sky-400",
  }
};

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate a random room for a given id and theme.
export function generateRandomPuzzle(id: number, theme: string): {
  id: number;
  title: string;
  description: string;
  puzzle: string;
  answer: string;
  theme: string;
} {
  const puzzle = pick(puzzleTemplates);
  return {
    id,
    title: pick([
      "Shadow Gate",
      "Labyrinth Nook",
      "Puzzle Dome",
      "Logic Tower",
      "Echoing Vault",
      "Starlit Hall",
      "Quantum Node",
      "Mirage Antechamber"
    ]),
    description: pick([
      "Glowing patterns flicker across the walls.",
      "The air hums with encrypted secrets.",
      "A distant chime echoes through digital fog.",
      "Dreamlike lights dance as you enter.",
      "You feel watched by unseen intellects.",
      "Ancient runes swirl in pulsing colors."
    ]),
    puzzle: puzzle.template,
    answer: puzzle.answer,
    theme
  }
}
