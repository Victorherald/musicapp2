import Image from "next/image";
import { Sidenav } from "../app/components/sideNavBar";
import { TopNav } from "../app/components/topNavbar";
import { MusicJumbotron } from "./components/container";
import { TopArtists } from "./components/topArtists";
import  { PlaylistSidebar } from "./components/playlists";


export default function Home() {
  return (
   <>
  {/* Top Nav */}
  <TopNav />

  <div className="min-h-screen bg-neutral-900 text-white flex">
    {/* Sidebar */}
    <Sidenav />

    {/* Main Content */}
    <main className="flex-1">
      <MusicJumbotron />
      {/* other components go here */}
      <TopArtists/>
       
    </main>
    <PlaylistSidebar/>
  </div>
 
</>

    
  );
}
