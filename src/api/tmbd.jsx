const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMoviesByGenre = async (genreId) => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await res.json();
  return data.results;
};

export const moodGenres = {
  "😂": 35,
  "😢": 18,
  "🤯": 28,
  "❤️": 10749,
  "👻": 27,
  "🎲": null,
};
