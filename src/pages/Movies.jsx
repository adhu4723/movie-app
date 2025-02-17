import React, { useState, useRef, useEffect } from "react";
import { useMovies } from "../context/movieContext";
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";
import { Search, Moon, Sun } from "lucide-react";
import { ThemeContext } from "../context/themeContext";
import { useContext } from "react";
import Switch from "../components/ToggleButton";
import Loader from "../components/Loader";

function Movies() {
  const { movies, loading, error, fetchMovies, selectedMovie, setSelectedMovie } = useMovies();
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [minRating, setMinRating] = useState("");
  const { theme } = useContext(ThemeContext);

  // 🔹 Store scroll position before changing views
  const scrollRef = useRef(0);
  const containerRef = useRef(null);

  // 🔹 Save scroll position before navigating to details
  const handleSelectMovie = (movie) => {
    if (containerRef.current) {
      scrollRef.current = containerRef.current.scrollTop; // Save scroll
    }
    setSelectedMovie(movie);
  };

  // 🔹 Restore scroll position when going back to list
  const handleBack = () => {
    setSelectedMovie(null);
  };

  // 🔹 Restore scroll after rendering MovieList
  useEffect(() => {
    if (!selectedMovie && containerRef.current) {
      containerRef.current.scrollTop = scrollRef.current; // Restore scroll
    }
  }, [selectedMovie]);

  const handleSearch = () => {
    if (search.trim()) {
      fetchMovies(search);
    }
  };

  const filteredMovies = movies.filter(
    (item) =>
      item.Poster !== "N/A" &&
      (!year || item.Year === year) &&
      (!minRating || (item.imdbRating !== "N/A" && parseFloat(item.imdbRating) >= parseFloat(minRating)))
  );

  const sortedMovies = [...filteredMovies].sort((a, b) =>
    sortOrder === "asc" ? a.Title.localeCompare(b.Title) : b.Title.localeCompare(a.Title)
  );

  return (
    <div
      ref={containerRef}
      className={`lg:mx-12 lg:my-6 border px-6 py-2 ${theme === 'light' ? 'bg-amber-50' : 'bg-black text-white'} h-[100vh] lg:h-[90vh] overflow-y-scroll`}
    >
      <h1 className="text-2xl font-bold flex justify-between gap-2 items-center font-cursive uppercase">
        <Search /> Movies List
        <Switch />
      </h1>

      {/* Search & Filter Inputs */}
      <div className={`flex gap-2 my-2 sticky top-0 px-4 py-2 ${theme === 'light' ? 'bg-amber-50' : 'bg-black text-white'}`}>
        <input
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search movies..."
        />
        <button 
          className="bg-amber-200 border text-black px-4 py-2 rounded hover:bg-amber-300"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      <div className={`my-2 flex gap-2 sticky bg-amber-50 px-4 py-2 top-14 ${theme === 'light' ? 'bg-amber-50' : 'bg-black text-white'}`}>
        <select className="border p-2 rounded w-full" onChange={(e) => setYear(e.target.value)} value={year}>
          <option value="">All Years</option>
          {[...new Set(movies.map((m) => m.Year))].map((y) => (
            <option className="text-black" key={y} value={y}>{y}</option>
          ))}
        </select>

        <select className="border p-2 rounded w-full" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>

        <select className="border p-2 rounded w-full" onChange={(e) => setMinRating(e.target.value)} value={minRating}>
          <option value="">All Ratings</option>
          {[...Array(10).keys()].map((r) => (
            <option key={r} value={r + 1}>{r + 1}+</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center  w-fit mx-auto text-gray-500"><Loader /></p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Show Movie Details or Movie List */}
      {selectedMovie ? (
        <MovieDetails selectedMovie={selectedMovie} setSelectedMovie={handleBack} />
      ) : (
        <MovieList movies={sortedMovies} setSelectedMovie={handleSelectMovie} />
      )}
    </div>
  );
}

export default Movies;
