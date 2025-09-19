"use client"


import { Play, Plus } from "lucide-react";
import { useState } from  "react";

type Playlist = {
  id: number;
  name: string;
  songs: number;
};



  
export function PlaylistSidebar() {

  const [playlists, setPlaylists] = useState <Playlist[]>([
  { id: 1, name: "Chill Vibes", songs: 42 },
  { id: 2, name: "Workout Mix", songs: 30 },
  { id: 3, name: "Late Night Jazz", songs: 18 },
  { id: 4, name: "Pop Essentials", songs: 50 },
  { id: 5, name: "Funk Fridays", songs: 28 },
  { id: 6, name: "Soulful Evenings", songs: 36 },


]);

const [newName, setNewName] = useState('');

  const createPlaylist = () => {
    if (!newName.trim()) return;
    setPlaylists((prev) => [
      ...prev,
      { id: Date.now(), name: newName, songs: 0 },
    ]);
    setNewName("");
  };
  
  return (
    <section className="bg-gradient-to-b from-purple-900 via-neutral-900 to-black mt-20 mr-10 rounded-2xl p-6 shadow-2xl w-70 h-[80vh] flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Your Playlists</h2>

       {/* Input to create new playlist */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New playlist..."
          className="flex-1 px-3 py-2 rounded-l-md bg-neutral-800 text-white text-sm focus:outline-none"
        />
        <button
          onClick={createPlaylist}
          className="px-3 py-2 bg-purple-600 rounded-r-md hover:bg-purple-700 transition"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-neutral-900">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-neutral-800/70 hover:bg-neutral-700/80 transition rounded-xl p-4 flex justify-between items-center cursor-pointer"
          >
            <div>
              <h3 className="font-semibold">{playlist.name}</h3>
              <p className="text-sm text-gray-400">{playlist.songs} songs</p>
            </div>
            <Play className="text-purple-400 hover:text-purple-300 transition" />
          </div>
        ))}
      </div>
    </section>
  );
}
