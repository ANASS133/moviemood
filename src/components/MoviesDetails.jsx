import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CalendarDaysIcon,
  ClockIcon,
  LanguageIcon,
  StarIcon,
  FilmIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      const data = await res.json();
      setMovie(data);
    };

    fetchDetails();
  }, [id]);

  if (!movie) {
    return <div className="text-white text-center mt-20 text-xl animate-pulse">Loading epicness...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b1b2f] via-[#1f4068] to-[#1b1b2f] text-white px-4 py-10 relative overflow-hidden">
      {/* Spotlight Glow */}
      <div className="absolute top-1/4 left-1/2 w-[80vw] h-[80vw] -translate-x-1/2 -translate-y-1/2 bg-purple-500/20 blur-3xl rounded-full z-0 animate-pulse-slow" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-block text-purple-300 hover:text-white transition duration-300 text-sm mb-8 underline underline-offset-4 hover:scale-105 motion-safe:animate-fadeIn"
        >
          ← Return to Moods
        </Link>

        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col md:flex-row gap-10 p-6 md:p-10 animate-fadeUp group">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-xl shadow-xl transform group-hover:scale-105 transition duration-500"
          />

          {/* Details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{movie.title}</h1>

            {movie.tagline && (
              <p className="italic text-purple-300 text-lg relative pl-2 animate-flicker">
                “{movie.tagline}”
              </p>
            )}

            <p className="text-white/90 leading-relaxed">{movie.overview}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80 pt-6">
              <MovieInfoItem icon={<CalendarDaysIcon className="w-5 h-5 text-purple-400" />} label="Release" value={movie.release_date} />
              <MovieInfoItem icon={<ClockIcon className="w-5 h-5 text-purple-400" />} label="Runtime" value={`${movie.runtime} min`} />
              <MovieInfoItem icon={<LanguageIcon className="w-5 h-5 text-purple-400" />} label="Language" value={movie.original_language.toUpperCase()} />
              <MovieInfoItem icon={<StarIcon className="w-5 h-5 text-yellow-400" />} label="Rating" value={`${movie.vote_average} (${movie.vote_count} votes)`} />
              <MovieInfoItem icon={<FilmIcon className="w-5 h-5 text-purple-400" />} label="Genres" value={movie.genres.map((g) => g.name).join(", ")} />
              {movie.homepage && (
                <div className="flex items-center gap-2">
                  <HomeIcon className="w-5 h-5 text-purple-400" />
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-purple-300 hover:text-white transition duration-300"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          45% { opacity: 0.6; }
          60% { opacity: 0.9; }
          75% { opacity: 0.3; }
        }
        .animate-flicker {
          animation: flicker 3s infinite;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.8s ease-out forwards;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .motion-safe\\:animate-fadeIn {
          animation: fadeIn 1.2s ease-out;
        }
      `}</style>
    </div>
  );
};

const MovieInfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    {icon}
    <p>
      <span className="text-white">{label}:</span> {value}
    </p>
  </div>
);

export default MovieDetails;
