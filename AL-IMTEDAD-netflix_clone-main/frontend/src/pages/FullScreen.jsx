import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovies, playMovie } from "../services/movieService";
import "../styles/fullscreen.css";

function FullScreen() {
  const [showBack, setShowBack] = useState(true);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const hideTimeout = useRef(null);

  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovies();
        if (!Array.isArray(res.data))
          throw new Error("Invalid movie data received");

        const foundMovie = res.data.find((m) => m.id === parseInt(movieId));
        if (!foundMovie) throw new Error("Movie not found");

        setMovie(foundMovie);

        try {
          await playMovie(foundMovie.id);
        } catch (err) {
          console.error("Error logging playback:", err.message);
        }
      } catch (error) {
        console.error("Error fetching Movie:", error.message);
        setError(err.message);
      }
    };
    fetchMovie();
  }, [movieId]);

  const handleBack = () => {
    try {
      navigate(-1);
    } catch (err) {
      console.error("Error navigating back:", err.message);
    }
  };
  const handleMouseMove = () => {
    try {
      setShowBack(true);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => {
        setShowBack(false);
      }, 1500);
    } catch (err) {
      console.error("Error handling mouse move:", err.message);
    }
  };

  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div>Loading...</div>;

  const embedUrl = movie.streamURL?.fullscreen
    ? movie.streamURL.fullscreen.replace("watch?v=", "embed/")
    : "";

  return (
    <div className="fullscreen-container">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          className="fullscreen-video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={movie.name}
        />
      ) : (
        <div className="error-message">Invalid video URL</div>
      )}
      <div
        className="iframe-overlay"
        onMouseMove={handleMouseMove}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "20%",
          height: "20%",
          zIndex: 2,
        }}
      />
      {showBack && (
        <button className="back-button" onClick={handleBack}>
          <p>Back to Home</p>
        </button>
      )}
    </div>
  );
}

export default FullScreen;
