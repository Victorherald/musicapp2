"use client";

import { useState } from "react";
import { Heart, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FavoriteProps = {
  id: number;
  title: string;
  artist: string;
  cover: string;
};

const recommendedTracks: FavoriteProps[] = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "Justin Bieber",
    cover: "https://i.scdn.co/image/ab67616d0000b273b5f2b0ecb4f3d379af7f0f7c",
  },
  {
    id: 2,
    title: "Levitating",
    artist: "Dua Lipa",
    cover: "https://i.scdn.co/image/ab67616d0000b273fa39a901b3ab3a2a1c51efc3",
  },
  {
    id: 3,
    title: "Stay",
    artist: "Justin Bieber, The Kid LAROI",
    cover: "https://i.scdn.co/image/ab67616d0000b273a989f5f9b9f83e0b0c5f62c5",
  },
];

export function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteProps[]>([]);

  const toggleFavorite = (track: FavoriteProps) => {
    setFavorites((prev) =>
      prev.find((f) => f.id === track.id)
        ? prev.filter((f) => f.id !== track.id)
        : [...prev, track]
    );
  };

  return (
    <section className="p-6 flex flex-col gap-8 w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-between items-center"
      >
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Your Favorites
        </h2>
        <span className="text-sm text-gray-400">
          {favorites.length} saved tracks
        </span>
      </motion.div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Favorites */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 max-h-[calc(100vh-220px)] overflow-y-auto backdrop-blur-md bg-white/5 p-4 rounded-2xl shadow-xl border border-white/10"
        >
          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 py-16"
            >
              <p className="text-lg mb-2">💔 No favorites yet</p>
              <p className="text-sm">Start adding tracks to see them here.</p>
            </motion.div>
          ) : (
            <ul className="flex flex-col gap-4">
              <AnimatePresence>
                {favorites.map((track) => (
                  <motion.li
                    key={track.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-4 bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-xl p-4 shadow-md"
                  >
                    <motion.img
                      src={track.cover}
                      alt={track.title}
                      className="w-16 h-16 rounded-lg object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{track.title}</h3>
                      <p className="text-xs text-gray-400">{track.artist}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition"
                      >
                        <Play size={16} />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => toggleFavorite(track)}
                        className="p-2 rounded-full bg-neutral-700 hover:bg-neutral-600 transition"
                      >
                        <Heart
                          size={16}
                          className={
                            favorites.find((f) => f.id === track.id)
                              ? "text-red-500"
                              : "text-gray-400"
                          }
                        />
                      </motion.button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </motion.div>

        {/* Recommended */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 max-h-[calc(100vh-220px)] overflow-y-auto backdrop-blur-md p-4 rounded-2xl shadow-xl border bg-neutral-800"
        >
          <h3 className="text-xl font-bold mb-4 text-white">Recommended</h3>
          <ul className="flex flex-col gap-4">
            {recommendedTracks.map((track) => (
              <motion.li
                key={track.id}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-4 bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-xl p-4 shadow-md"
              >
                <motion.img
                  src={track.cover}
                  alt={track.title}
                  className="w-16 h-16 rounded-lg object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{track.title}</h4>
                  <p className="text-xs text-gray-400">{track.artist}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => toggleFavorite(track)}
                  className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition"
                >
                  <Heart
                    size={16}
                    className={
                      favorites.find((f) => f.id === track.id)
                        ? "text-red-500"
                        : "text-white"
                    }
                  />
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
