"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../components/context/UserContext";
import { Camera } from "lucide-react"; // nice camera icon

export default function Signup() {
  const { setUser } = useUser();
  const router = useRouter();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setAvatar(objectUrl);
  };

  const handleSignup = () => {
    if (!name || !avatar) return;
    setUser({ name, avatar });
    router.push("/"); // back to home
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-black text-white px-6">
      <h1 className="text-3xl font-bold mb-8">Create Your Account</h1>

      {/* Portrait + Upload Icon */}
      <div className="relative w-32 h-44 mb-6">
        <img
          src={preview || "/placeholder-portrait.png"} // fallback placeholder
          alt="Preview"
          className="w-full h-full object-cover rounded-lg border-2 border-purple-500"
        />

        {/* Hidden input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />

        {/* Upload button */}
        <button
          onClick={triggerFileInput}
          className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-full shadow-lg"
        >
          <Camera size={16} />
        </button>
      </div>

      {/* Name */}
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full max-w-sm mb-4 px-4 py-2 rounded-lg bg-zinc-800 focus:ring-2 focus:ring-purple-500 outline-none"
      />

      <button
        onClick={handleSignup}
        disabled={!name || !avatar}
        className="w-full max-w-sm py-2 rounded-lg bg-purple-600 hover:bg-purple-700 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sign Up
      </button>
    </div>
  );
}
