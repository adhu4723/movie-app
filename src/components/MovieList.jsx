import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

function MovieList({ movies, setSelectedMovie }) {
  const {theme,toggleTheme}=useContext(ThemeContext)
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-4`}>
      {movies.map((item) => (
        <div
          key={item.imdbID}
          className={`border p-2 rounded shadow hover:shadow-lg transition cursor-pointer ${theme=='light'?'bg-amber-50':'bg-black text-white'}`}
          onClick={() => setSelectedMovie(item)}
        >
          <img className="h-[50vh] object-cover w-full" src={item.Poster} alt={item.Title} />
          <h2 className="text-lg font-semibold mt-2 truncate w-52">{item.Title} ({item.Year})</h2>
          {item.imdbRating !== "N/A" && (
            <p className="text-sm text-gray-700">IMDb: {item.imdbRating}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default MovieList;
