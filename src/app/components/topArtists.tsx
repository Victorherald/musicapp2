"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { resourceLimits } from "worker_threads";

type Artist = {
  name: string;
  id: string;
};

const artists = [
  { id: 1, name: "Artist One" },
  { id: 2, name: "Artist Two" },
  { id: 3, name: "Artist Three" },
  { id: 4, name: "Artist Four" }
];

export function TopArtists() {
   const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState<any[]>([]);
  const [error, setError] = useState(null);

  const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const options = {
      method: "GET",
      url: "https://spotify81.p.rapidapi.com/top_20_by_monthly_listeners", // example Spotify81 endpoint
      headers: {
        "X-RapidAPI-Key": "e1d62073bdmsheb009b5b8a6f2a2p1f906ejsnf82d7a056083", // put your RapidAPI key here
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
      },

      params: { id: "1Xyo4u8uXC1ZmMpatF05PJ" },

      
    };

    axios
      .request(options)
      .then((res) => {
        console.log("API response:", res.data);

        // Adjust depending on response structure
          const arts = Array.isArray(res.data)
      ? res.data
          .slice(0, 4) // 👈 only keep first 10
          .map((a: any) => ({
            id: a.rank,
            name: a.artist,
            monthlyListeners: a.monthlyListeners,
          }))
      : [];

    setArtists(arts);
  })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const imageMap: Record<string, string> = {
  "The Weeknd": "https://i.scdn.co/image/ab6761610000e5eb1234567890abcdef12345678",
  "Bruno Mars": "https://i.scdn.co/image/ab6761610000e5ebabcdef123456789012345678",
  "Justin Bieber": "https://i.scdn.co/image/ab6761610000e5ebfedcba987654321001234567",
};

  if (loading) return <div className="text-gray-400 ml-25">Loading top artists…</div>;
  if (error) return <div className="text-red-500 ml-25" >Error: {error}</div>;
 




  

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth - 100; // slide by container width minus small offset
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="ml-44 mt-6 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Latest Songs</h2>
        <div className="flex space-x-2">{/* extra buttons later */}</div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-hidden space-x-4 scrollbar-hide scroll-smooth"
      >
        {artists.map((artist, i) => (
          <div key={artist.rank} className="flex-shrink-0 w-32">
            <div className="w-32 h-32 bg-neutral-700 rounded-full flex items-center justify-center">
              {/* Placeholder image */}
              <img
  src={imageMap[artist.name] || "https://via.placeholder.com/150"}
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
    </section>
  );
}
