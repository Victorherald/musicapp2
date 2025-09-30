"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export function TopArtists() {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<any | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://spotify81.p.rapidapi.com/top_20_by_monthly_listeners",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_URL,
      },
      params: { id: "1Xyo4u8uXC1ZmMpatF05PJ" },
    };

    axios
      .request(options)
      .then((res) => {
        console.log("API response:", res.data);

        const arts = Array.isArray(res.data)
          ? res.data.slice(0, 4).map((a: any, i: number) => ({
              id: a.rank || i + 1,
              name: a.artistName || a.artist || "Unknown",
              monthlyListeners: a.monthlyListeners || "N/A",
              image:
                a.artistImage ||
                a.image ||
                "https://picsum.photos/150", // ✅ fallback
            }))
          : [];

        console.log("Parsed artists:", arts);
        setArtists(arts);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-gray-400 ml-25">Loading top artists…</div>;
  if (error) return <div className="text-red-500 ml-25">Error: {error}</div>;

  return (
    <section className="ml-44 mt-6 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Latest Songs</h2>
      </div>

      <div ref={scrollRef} className="flex overflow-hidden space-x-4 scrollbar-hide scroll-smooth">
        {artists.map((artist) => (
          <div
            key={artist.id}
            onClick={() => setSelected(artist)}
            className="flex-shrink-0 w-32 cursor-pointer"
          >
            <div className="w-32 h-32 bg-neutral-700 rounded-full flex items-center justify-center">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-32 h-32 rounded-full object-cover overflow-hidden"
              />
            </div>
            <p className="mt-2 text-center text-sm font-medium">
              {artist.id}. {artist.name}
            </p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <>
            {/* overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            {/* modal content */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            >
              <div className="bg-neutral-900 rounded-2xl shadow-xl p-6 w-80 relative">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-white"
                  onClick={() => setSelected(null)}
                >
                  ✕
                </button>

                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-purple-500"
                />
                <h3 className="text-xl font-bold text-center mt-3 text-white">
                  {selected.name}
                </h3>
                <p className="text-center text-gray-400">
                  {selected.monthlyListeners} monthly listeners
                </p>

                <ul className="mt-4 space-y-2">
                  <p>Top Songs</p>
                  {["Song 1", "Song 2", "Song 3"].map((song, i) => (
                    <li key={i} className="p-2 rounded-lg bg-neutral-800 text-sm text-white">
                      {song}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
