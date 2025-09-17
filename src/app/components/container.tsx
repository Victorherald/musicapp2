"use client";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";


type Slide = {
  title: string
  text: string
  button: string
}


const slides: Slide[] = [
 {
    title: "Feel the Beat",
    text: "Discover the hottest tracks and trending artists all in one place.",
    button: "Start Listening",
  },
  {
    title: "Legends Live On",
    text: "Celebrate timeless music icons like Michael Jackson & Whitney Houston.",
    button: "Explore Classics",
  },
  {
    title: "Your Vibe, Your Way",
    text: "Create custom playlists that match your mood and style.",
    button: "Make a Playlist",
  },
  {
    title: "Top Charts, Always Fresh",
    text: "Stay up-to-date with the latest hits from around the world.",
    button: "See Top Artists",
  },
];



export function MusicJumbotron() {
  const [index, setIndex] = useState(0);

    // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);



  const current = slides[index];

 // 👇 dynamic font sizing
  const titleSize = current.title.length > 20 ? "text-2xl" : "text-3xl";
  const textSize = current.text.length > 60 ? "text-sm" : "text-lg";


  return (
    <section className="ml-34 mt-20 px-6">
      
      <div className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700 
                  rounded-2xl p-7 mb-6 shadow-lg max-w-xl h-45 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index} // important for animation
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
        <h1 className={`${titleSize} font-bold mb-2`}>
       {current.title} 
      </h1>
      <p className={`${textSize} text-purple-100 mb-4`}>
        {current.text}
      </p>
      <button className="bg-white text-purple-800 px-4 py-2 mt-1 rounded-lg hover:bg-purple-200">
        {current.button}
      </button>
       
      </motion.div>
    </AnimatePresence>
      </div>
       
    </section>
   
  );
}
