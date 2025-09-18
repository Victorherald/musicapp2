"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { AnimatedSearch } from "../components/searchSect";
import { useUser } from "./context/UserContext";
import { motion, AnimatePresence } from "framer-motion";

export function TopNav() {
  const { user } = useUser();

  // Example notifications array (use strings or objects)
  // Option A: simple strings:
  // const [notifications, setNotifications] = useState<string[]>([
  //   "New album released by Drake",
  //   "Your playlist has a new follower",
  // ]);

  // Option B: objects with read flag (recommended)
  const [notifications, setNotifications] = useState<
    { id: number; text: string; read: boolean }[]
  >([
    { id: 1, text: "New album released by Drake", read: false },
    { id: 2, text: "Your playlist has a new follower", read: false },
  ]);

  const repeated = Array.from({ length: 100 }, () => ({ ...notifications }));

  // unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // popup open state
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  // click outside to close
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, [open]);

  const togglePopup = () => setOpen((s) => !s);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <header className="ml-11 mr-11 w-[calc(100%-12rem)] bg-neutral-900 text-white flex items-center justify-between px-6 py-1 shadow-md fixed top-0 right-0 z-10">
      {/* Left nav */}
      <nav className="flex space-x-6">
        <Link href="/" className="hover:text-purple-400 transition">Music</Link>
        <Link href="/browse" className="hover:text-purple-400 transition">Podcasts</Link>
        <Link href="/library" className="hover:text-purple-400 transition">Live</Link>
      </nav>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        <AnimatedSearch />

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={togglePopup}
            aria-label="Notifications"
            className="relative p-2 hover:bg-neutral-800 rounded-full"
          >
            <Bell className="h-5 w-5" />
            {/* numeric badge (only show if unreadCount > 0) */}
            {unreadCount > 0 && (
              <span
                aria-hidden
                className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white bg-red-500 rounded-full shadow"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Popup */}
          <AnimatePresence>
            {open && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 w-80 bg-neutral-800 text-white rounded-lg shadow-lg p-3 z-20"
              >
                {notifications.length > 0 ? (
                  <>
                    <div className="max-h-56 overflow-y-auto space-y-2">
                      {notifications.map((note) => (
                        <div
                          key={note.id}
                          className={`p-2 rounded-md ${
                            note.read ? "bg-neutral-700/40" : "bg-neutral-700"
                          }`}
                        >
                          <p className="text-sm">{note.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <button
                        onClick={markAllRead}
                        className="text-sm text-purple-400 hover:underline"
                      >
                        Mark all read
                      </button>
                      <span className="text-xs text-gray-400">
                        {unreadCount} unread
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-400">
                    No notifications — you are all caught up for now
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar / auth */}
        <div className="flex items-center justify-end space-x-4 p-4">
          {!user ? (
            <>
              <Link href="/login" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">Login</Link>
              <Link href="/signup" className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700">SignUp</Link>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-purple-500" />
              <span className="text-sm">{user.name}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
