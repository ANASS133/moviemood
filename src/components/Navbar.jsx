import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}`);
      setSearch("");
    }
  };

  return (
    <nav className="bg-gradient-to-br from-[#1b1b2f] via-[#1f4068] to-[#1b1b2f] backdrop-blur-md sticky top-0 z-50 px-4 py-4 border-b border-white/10 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo - Click to Show All Movies */}
        <div
          className="text-center md:text-left cursor-pointer"
          onClick={() => navigate("/?showAll=true")}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight animate-glow">
            <span className="text-white">Movie</span>
            <span className="text-purple-400">Mood</span>
          </h1>
          <p className="text-xs text-white/60 mt-1 md:mt-0">
            by <span className="text-purple-400">Anass</span>
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <input
            type="text"
            placeholder="Search movies..."
            className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Search
          </button>
        </form>
      </div>

      {/* Glow animation */}
      <style>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 12px #a855f7, 0 0 24px #9333ea; }
          50% { text-shadow: 0 0 24px #c084fc, 0 0 36px #9333ea; }
        }
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
