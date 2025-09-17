"use client";
import { useState } from "react";
import { Home, ListMusic, Heart, Flame } from "lucide-react";

export function Sidenav() {
  const [active, setActive] = useState("home");

  return (
    <div className="fixed top-0 left-0 h-screen w-22 bg-purple-950 text-white flex flex-col p-4">
      <h3 className="text-2xl font-bold mb-6 mr-6">YBeats</h3>

      <nav className="flex flex-col space-y-7 mt-9">
        <button
          onClick={() => setActive("home")}
          className={`p-3 rounded transition ${
            active === "home"
              ? "text-blue-400 bg-purple-800"
              : "text-neutral-400 hover:text-blue-400"
          }`}
        >
          <Home className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActive("playlists")}
          className={`p-3 rounded transition ${
            active === "playlists"
              ? "text-blue-400 bg-purple-800"
              : "text-neutral-400 hover:text-blue-400"
          }`}
        >
          <ListMusic className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActive("favorites")}
          className={`p-3 rounded transition ${
            active === "favorites"
              ? "text-blue-400 bg-purple-800"
              : "text-neutral-400 hover:text-blue-400"
          }`}
        >
          <Heart className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActive("trending")}
          className={`p-3 rounded transition ${
            active === "trending"
              ? "text-blue-400 bg-purple-800"
              : "text-neutral-400 hover:text-blue-400"
          }`}
        >
          <Flame className="w-6 h-6" />
        </button>
      </nav>

      {/* Main content (example) */}
      <div className="mt-12 text-sm">
        {active === "home" && <p>Home</p>}
        {active === "playlists" && <p className="text-gray-500"> Playlists</p>}
        {active === "favorites" && <p className="text-gray-500"> Favorites</p>}
        {active === "trending" && <p className="text-gray-500">  Trending</p>}
      </div>
    </div>
  );
}
