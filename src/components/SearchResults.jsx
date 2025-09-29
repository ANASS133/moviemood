import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&query=${encodeURIComponent(query)}`
        );

        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (error) return <p className="text-red-500 p-6">Error: {error}</p>;

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-br from-[#1b1b2f] via-[#1f4068] to-[#1b1b2f]">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {results.map((movie, index) => (
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
      ) : (
        <p className="text-gray-400">No results found.</p>
      )}

      {/* Scoped CSS for fadeInUp animation */}
      <style>{`
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

export default SearchResults;
