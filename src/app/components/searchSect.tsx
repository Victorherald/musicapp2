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
  const [searched, setSearched] = useState(false);

  // rotate placeholder every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * placeholders.length));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setSearched(true);
    const filtered = mockSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="w-full max-w-lg mx-auto relative">
      {/* Search input + button */}
      <div className="flex items-center bg-neutral-800 rounded-full px-4 py-2 shadow-md relative">
        <Search className="text-gray-400 mr-2 shrink-0" />

        {/* input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-transparent outline-none text-purple-200 placeholder-transparent"
          />

          {/* animated placeholder */}
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
          className="ml-2 px-3 py-1 text-sm rounded-md bg-neutral-700 text-white hover:bg-purple-600 transition"
        >
          Go
        </button>
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {(results.length > 0 || searched) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-20"
          >
            {results.length > 0 ? (
              <ul className="divide-y divide-neutral-700">
                {results.map((song) => (
                  <li
                    key={song.id}
                    className="p-3 hover:bg-neutral-700 transition cursor-pointer"
                  >
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-3 text-sm text-gray-400">No results found</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
