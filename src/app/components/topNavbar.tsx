"use client";

import { Bell } from "lucide-react"; // icon library (Tailwind + Lucide)
import Image from "next/image";
import Link from "next/link";
import { AnimatedSearch } from '../components/searchSect';
import { Avatar } from "../components/avatar";
import { useUser } from "../context/UserContext";


export function TopNav() {

   const { user } = useUser();


  return (
    <header className="ml-11 mr-11 w-[calc(100%-12rem)] bg-neutral-900 text-white flex items-center justify-between px-6 py-1 shadow-md fixed top-0 right-0 z-10">
      {/* Left side - Links */}
      <nav className="flex space-x-6">
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

      

      {/* Right side - Notification + Avatar */}
      <div className="flex items-center space-x-4">
          <AnimatedSearch/>
        {/* Notification */}
        <button className="relative p-2 hover:bg-neutral-800 rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
       <div className="flex items-center justify-end space-x-4 p-4">
      {!user ? (
        <>
          <Link href="/login" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
            Login
          </Link>
          <Link href="/signup" className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700">
            SignUp
          </Link>
        </>
      ) : (
        <div className="flex items-center space-x-2">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-8 h-8 rounded-full border border-purple-500"
          />
          <span className="text-sm">{user.name}</span>
        </div>
      )}
    </div>
      </div>
    </header>
  );
}
