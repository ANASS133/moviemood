import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MoviesDetails';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </>
  );
};

export default App;
