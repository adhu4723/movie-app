import React, { useContext } from "react";
import { ChevronLeft } from "lucide-react";
import { ThemeContext } from "../context/themeContext";

function MovieDetails({ selectedMovie, setSelectedMovie }) {
   const {theme,toggleTheme}=useContext(ThemeContext)
  return (
    <div className={`p-4 rounded bg-amber-100 border  ${theme=='light'?'bg-amber-50':'bg-black text-white'}`}>
      <button
        className="border px-2 py-2 rounded mb-4"
        onClick={() => setSelectedMovie(null)}
      >
        <ChevronLeft />
      </button>
      <div className="flex flex-col md:flex-row">
        <img className="h-80 object-cover rounded w-full md:w-1/3" src={selectedMovie.Poster} alt={selectedMovie.Title} />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-semibold">{selectedMovie.Title} ({selectedMovie.Year})</h2>
          <p className=" mt-2"><strong>IMDb Rating:</strong> {selectedMovie.imdbRating}</p>
          <p className=""><strong>Genre:</strong> {selectedMovie.Genre}</p>
          <p className=""><strong>Director:</strong> {selectedMovie.Director}</p>
          <p className=" mt-2"><strong>Plot:</strong> {selectedMovie.Plot}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
