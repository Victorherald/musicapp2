"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockSongs = [
  { id: 1, title: "Funk Vibes", artist: "DJ Smooth" },
  { id: 2, title: "Pop Energy", artist: "Kylie Beats" },
  { id: 3, title: "Hip Hop Flow", artist: "MC Storm" },
  { id: 4, title: "Chill Dreams", artist: "LoFi Kid" },
  { id: 5, title: "Electric Pulse", artist: "Synth Rider" },
];

export function AnimatedSearch() {
  const placeholders = [
    "Search funk",
    "Search pop",
    "Search jazz",
    "Search soul",
    "Search dubstep",
    "Search synthwave",
  ];

  const [index, setIndex] = useState(
    Math.floor(Math.random() * placeholders.length)
  );
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof mockSongs>([]);

  // animate placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * placeholders.length));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // search handler
  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const filtered = mockSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="w-full max-w-md">
      {/* Search input + button */}
      <div className="flex items-center bg-neutral-800 rounded-full px-4 py-2 shadow-md overflow-hidden relative">
        <Search className="text-gray-400 mr-2" />

        {/* input container */}
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-transparent outline-none text-purple-200"
          />

          {/* Animated placeholder overlay */}
          {query === "" && (
            <div className="absolute left-0 top-0 w-full pointer-events-none text-gray-400">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-purple-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                >
                  {placeholders[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="ml-2 text-gray-400 hover:text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition"
        >
          Go
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <ul className="mt-4 space-y-2">
          {results.map((song) => (
            <li
              key={song.id}
              className="p-3 bg-neutral-700 rounded-lg hover:bg-neutral-600"
            >
              <p className="font-semibold">{song.title}</p>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
