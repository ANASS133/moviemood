import React, { useState, useEffect } from "react";
import { fetchMoviesByGenre, moodGenres } from "../api/tmbd";
import MoodSelector from "../components/MoodSelector";
import { Link, useLocation } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [allTopRated, setAllTopRated] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const location = useLocation();

  // Update `showAll` based on URL
  useEffect(() => {
    const param = new URLSearchParams(location.search).get("showAll");
    setShowAll(param === "true");
  }, [location]);

  useEffect(() => {
    const getMovies = async () => {
      if (!selectedMood && !showAll) return;

      let allResults = [];

      try {
        if (showAll) {
          // Fetch from multiple pages
          for (let page = 1; page <= 2; page++) {
            const res = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${
                import.meta.env.VITE_TMDB_API_KEY
              }&page=${page}`
            );
            const data = await res.json();
            allResults = [...allResults, ...data.results];
          }

          setMovies(allResults);
          setAllTopRated([]);
        } else {
          const genreId = moodGenres[selectedMood];
          let results = [];

          if (genreId === null) {
            const randomPage = Math.floor(Math.random() * 100) + 1;
            const res = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${
                import.meta.env.VITE_TMDB_API_KEY
              }&page=${randomPage}`
            );
            const data = await res.json();
            results = data.results;
          } else {
            results = await fetchMoviesByGenre(genreId);
          }

          const topRated = results.filter((m) => m.vote_average > 7);
          setAllTopRated(topRated);
          setMovies(pickRandomThree(topRated));
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    getMovies();
  }, [selectedMood, showAll]);

  const pickRandomThree = (arr) => {
    return arr
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  };

  const handleRefresh = () => {
    if (allTopRated.length === 0) return;
    setMovies(pickRandomThree(allTopRated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b1b2f] via-[#1f4068] to-[#1b1b2f] text-white px-6 py-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-[80vw] h-[80vw] bg-purple-500/20 blur-3xl rounded-full animate-pulse-slow z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 tracking-tight animate-glow">
          Choose your <span className="text-purple-400">mood</span>, and I’ll propose a film that fits you.
        </h2>

        <MoodSelector
          onSelectMood={(mood) => {
            setSelectedMood(mood);
            setShowAll(false);
            window.history.replaceState(null, '', '/');
          }}
        />

        {movies.length > 0 && !showAll && (
          <p className="mt-8 text-xl text-center font-semibold text-purple-300">
            Ich schlage vor, dass du diese Filme sehen solltest 🎬
          </p>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {movies.map((movie, index) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="group relative bg-white/5 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.03] transition duration-300 opacity-0 translate-y-6 animate-fadeInUp"
              style={{
                animationDelay: `${index * 120}ms`,
                animationFillMode: "forwards",
              }}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover group-hover:opacity-90 transition duration-300"
                />
              ) : (
                <div className="w-full h-72 bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

              <div className="p-4">
                <h2 className="text-xl font-bold mb-1">{movie.title}</h2>
                <div className="flex items-center text-white/70 text-sm">
                  <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                  {typeof movie.vote_average === "number"
                    ? movie.vote_average.toFixed(1)
                    : "N/A"}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Repeat button shown only when mood is selected and 3 movies are shown */}
        {movies.length === 3 && !showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={handleRefresh}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full shadow-md transition duration-300"
            >
              🎲 Weitere Vorschläge
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 12px #a855f7, 0 0 24px #9333ea; }
          50% { text-shadow: 0 0 24px #c084fc, 0 0 36px #9333ea; }
        }
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;
