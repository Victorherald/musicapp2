"use client";

import { useState } from "react";
import { Heart, Play, Pause, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TrackProps = {
  id: number;
  title: string;
  artist: string;
  cover: string;
};

const recommendedTracks: TrackProps[] = [
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
  const [favorites, setFavorites] = useState<TrackProps[]>([]);
  const [currentTrack, setCurrentTrack] = useState<TrackProps | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Add / remove favorite
  const toggleFavorite = (track: TrackProps) => {
    setFavorites((prev) =>
      prev.find((f) => f.id === track.id)
        ? prev.filter((f) => f.id !== track.id)
        : [...prev, track]
    );
  };

  // Open popup
  const openPlayer = (track: TrackProps) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <section className="p-4 sm:p-6 flex flex-col gap-8 w-full lg:max-w-5xl lg:mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Your Favorites
        </h2>
        <span className="text-sm text-gray-400">{favorites.length} saved tracks</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Favorites List */}
        <div className="flex-1 max-h-[calc(100vh-110px)] overflow-y-auto backdrop-blur-md bg-white/5 p-4 rounded-2xl shadow-xl border border-white/10">
          {favorites.length === 0 ? (
            <div className="text-center text-gray-400 py-11">
              <p className="text-lg mb-2">No favorites yet</p>
              <p className="text-sm">Start adding tracks to see them here.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {favorites.map((track) => (
                <li
                  key={track.id}
                  className="flex items-center gap-4 bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-xl p-4 shadow-md"
                >
                  <motion.img
                    layoutId={`disc-${track.id}`}
                    src={track.cover}
                    alt={track.title}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{track.title}</h3>
                    <p className="text-xs text-gray-400">{track.artist}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openPlayer(track)}
                      className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition"
                    >
                      <Play size={16} />
                    </button>
                    <button
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
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recommended List */}
        <div className="flex-1 max-h-[calc(100vh-220px)] overflow-y-auto backdrop-blur-md p-4 rounded-2xl shadow-xl border bg-neutral-800">
          <h3 className="text-xl font-bold mb-4 text-white">Recommended</h3>
          <ul className="flex flex-col gap-4">
            {recommendedTracks.map((track) => (
              <li
                key={track.id}
                className="flex items-center gap-4 bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-xl p-4 shadow-md"
              >
                <motion.img
                  layoutId={`disc-${track.id}`}
                  src={track.cover}
                  alt={track.title}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{track.title}</h4>
                  <p className="text-xs text-gray-400">{track.artist}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openPlayer(track)}
                    className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition"
                  >
                    <Play size={16} />
                  </button>
                  <button
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
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Popup Player */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              layoutId={`disc-${currentTrack.id}`}
              className="bg-neutral-900 p-6 rounded-2xl flex flex-col items-center gap-4 w-full max-w-sm"
            >
              {/* Enlarged Disc */}
              <motion.img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-48 h-48 rounded-full object-cover"
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  isPlaying
                    ? { repeat: Infinity, duration: 5, ease: "linear" }
                    : {}
                }
              />

              {/* Title / Artist */}
              <h3 className="text-lg font-bold">{currentTrack.title}</h3>
              <p className="text-sm text-gray-400">{currentTrack.artist}</p>

              {/* Controls */}
              <div className="flex items-center gap-4 w-full">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-purple-600 rounded-full hover:bg-purple-700"
                >
                  {isPlaying ? <Pause /> : <Play />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="flex-1 accent-purple-500"
                />
                <button
                  onClick={() => setCurrentTrack(null)}
                  className="p-3 bg-neutral-700 rounded-full hover:bg-neutral-600"
                >
                  <X />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
