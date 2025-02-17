import { createContext, useState, useContext } from "react";
import axios from "axios";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_KEY = "6c998e1b"; // Replace with your actual API key

  const fetchMovies = async (search = "batman") => {
    setLoading(true);
    setError(null);
    setSelectedMovie(null);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&type=movie`
      );

      if (response.data.Response === "True") {
        let moviesList = response.data.Search || [];

        const movieDetailsPromises = moviesList.map((movie) =>
          axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`)
        );

        const movieDetailsResponses = await Promise.all(movieDetailsPromises);

        moviesList = moviesList.map((movie, index) => ({
          ...movie,
          imdbRating: movieDetailsResponses[index].data.imdbRating || "N/A",
          Plot: movieDetailsResponses[index].data.Plot || "No plot available",
          Genre: movieDetailsResponses[index].data.Genre || "Unknown",
          Director: movieDetailsResponses[index].data.Director || "Unknown",
        }));

        setMovies(moviesList);
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieContext.Provider value={{ movies, loading, error, fetchMovies, selectedMovie, setSelectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook for using the MovieContext
export const useMovies = () => {
  return useContext(MovieContext);
};
