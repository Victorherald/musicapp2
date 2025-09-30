"use client";

import { useState } from "react";
import { Sidenav } from "../app/components/sideNavBar";
import { TopNav } from "../app/components/topNavbar";
import { MusicJumbotron } from "./components/container";
import { TopArtists } from "./components/topArtists";
import { PlaylistSidebar } from "./components/playlists";
import { AnimatePresence, motion } from "framer-motion";
import { Favorites } from "./components/Favorites";

export default function Home() {
  const [active, setActive] = useState("home");

  return (
    <>
      <TopNav />

      <div className="min-h-screen bg-neutral-900 text-white flex">
        {/* Sidebar (nav) */}
        <Sidenav active={active} setActive={setActive} />

        {/* Main Content Area */}
        <main className="flex-1 flex overflow-hidden">
          <AnimatePresence mode="wait">
            {active === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex"
              >
                <div className="flex-1">
                  <MusicJumbotron />
                  <TopArtists />
                </div>
                <PlaylistSidebar />
              </motion.div>
            )}

            {active === "favorites" && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex items-center justify-center text-lg"
              >
                <Favorites/>
              </motion.div>
            )}

            {active === "trending" && (
              <motion.div
                key="trending"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex items-center justify-center text-lg"
              >
                🔥 Trending tracks
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
