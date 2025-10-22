import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { getMovies } from "../services/movieService";
import { useEffect, useState } from "react";
import "../styles/home.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies();
        if (!Array.isArray(res.data))
          throw new Error("Invalid movie data received");
        setMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies:", err.message);
        setError("Failed to load movies. Please try again later.");
      }
    };
    fetchMovies();
  }, []);
  return (
    <div className="home-container">
      <Navbar />
      {error && <div className="error-message">{error}</div>}
      
      <h1 className="movies-heading">Movies</h1>
      
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isHovered={hoveredMovie === movie.id}
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            />
          ))
        ) : !error ? (
          <div>Loading movies...</div>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
