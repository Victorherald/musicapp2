"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import Link from "next/link";
import { AnimatedSearch } from "../components/searchSect";
import { useUser } from "./context/UserContext";
import { motion, AnimatePresence } from "framer-motion";

export function TopNav() {
  // ✅ Get both user and setUser here
  const { user, setUser } = useUser();

  const [notifications, setNotifications] = useState<
    { id: number; text: string; read: boolean }[]
  >([
    { id: 1, text: "New album released by Drake", read: false },
    { id: 2, text: "Your playlist has a new follower", read: false },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

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
    <header className="w-full bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between px-4 md:px-6 py-2 shadow-md fixed top-0 left-0 z-10 gap-3">
      {/* Left nav + hamburger */}
      <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-start">
        <button
          className="md:hidden p-2 hover:bg-neutral-800 rounded-lg"
          onClick={() => setMenuOpen((s) => !s)}
        >
          <Menu className="h-6 w-6" />
        </button>

        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-14 left-0 w-full bg-neutral-900 p-4 space-y-2 md:static md:flex md:space-x-6 md:space-y-0`}
        >
          <Link href="/" className="hover:text-purple-400 transition">
            Music
          </Link>
          <Link href="/browse" className="hover:text-purple-400 transition">
            Podcasts
          </Link>
          <Link href="/library" className="hover:text-purple-400 transition">
            Live
          </Link>
        </nav>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs sm:max-w-md w-full px-2">
        <AnimatedSearch />
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={togglePopup}
            aria-label="Notifications"
            className="relative p-2 hover:bg-neutral-800 rounded-full"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white bg-red-500 rounded-full shadow">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 w-72 sm:w-80 bg-neutral-800 text-white rounded-lg shadow-lg p-3 z-20"
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
        <div className="flex items-center justify-end space-x-4 relative">
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-3 py-1 bg-purple-600 rounded-lg hover:bg-purple-700 text-sm"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1 bg-green-600 rounded-lg hover:bg-green-700 text-sm"
              >
                SignUp
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="flex items-center space-x-2 hover:bg-neutral-800 px-2 py-1 rounded-lg"
              >
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-purple-500"
                />
                <span className="text-sm">{user.name}</span>
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-40 bg-neutral-800 text-white rounded-lg shadow-lg p-2 z-20"
                  >
                    <button
                      onClick={() => {
                        setUser(null); // ✅ clear user from context
                        setMenuOpen(false);
                        console.log("Logged out");
                      }}
                      className="px-3 py-1 text-center bg-purple-600 rounded-lg hover:bg-purple-700 text-sm"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
