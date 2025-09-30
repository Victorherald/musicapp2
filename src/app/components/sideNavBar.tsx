"use client";
import { Home, Heart, Flame } from "lucide-react";

type StatusProps = {
  active: string;
  setActive: (id: string) => void; 
}


export function Sidenav({ active, setActive }: StatusProps) {
  const navItems = [
    { id: "home", icon: <Home className="w-6 h-6" /> },
    { id: "favorites", icon: <Heart className="w-6 h-6" /> },
    { id: "trending", icon: <Flame className="w-6 h-6" /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed top-0 left-0 h-screen w-24 bg-purple-950 text-white flex-col p-4">
        <h3 className="text-2xl font-bold mb-6">YBeats</h3>
        <nav className="flex flex-col space-y-7 mt-9">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`p-3 rounded transition ${
                active === item.id
                  ? "text-blue-400 bg-purple-800"
                  : "text-neutral-400 hover:text-blue-400"
              }`}
            >
              {item.icon}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-purple-950 text-white flex justify-around items-center py-3 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`p-2 rounded transition ${
              active === item.id
                ? "text-blue-400 bg-purple-800"
                : "text-neutral-400 hover:text-blue-400"
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </>
  );
}
