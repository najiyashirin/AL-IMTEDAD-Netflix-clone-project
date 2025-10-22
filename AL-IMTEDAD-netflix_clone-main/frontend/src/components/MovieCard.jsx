import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/moviecard.css";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const fadeTimeout = useRef(null);

  const handleMouseEnter = () => {
    try {
      const video = videoRef.current;
      if (!video) throw new Error("Video element not found");
      if (!movie?.streamURL?.preview) throw new Error("Preview URL missing");

      if (fadeTimeout.current) {
        clearTimeout(fadeTimeout.current);
        fadeTimeout.current = null;
      }

      video.style.opacity = 1;
      video.currentTime = 0;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video
            .play()
            .catch((err) =>
              console.error("Failed to play video on hover:", err)
            );
        });
      }
    } catch (err) {
      console.error(
        `Error on hover for movie ${movie?.name || "Not Found"}:`,
        err.message
      );
    }
  };

  const handleMouseLeave = () => {
    try {
      const video = videoRef.current;
      if (!video) return;

      video.style.opacity = 0;

      fadeTimeout.current = setTimeout(() => {
        video.pause();
        video.currentTime = 0;
      }, 300);
    } catch (err) {
      console.error(
        `Error stopping hover video for movie ${movie?.name || "Not Found"}:`,
        err.message
      );
    }
  };

  const handleClick = () => {
    try {
      if (!movie?.id) throw new Error("Movie ID missing");
      navigate(`/play/${movie.id}`);
    } catch (error) {
      console.error("Error navigating to fullscreen:", error.message);
    }
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="movie-media">
        <img
          src={`http://localhost:3000${movie?.logo}`}
          alt={movie?.name || " Movie Not Found "}
          className="movie-poster"
        />
        <video
          ref={videoRef}
          src={`http://localhost:3000${movie?.streamURL?.preview || ""}`}
          className="movie-preview"
          muted
          loop
          playsInline
        />
      </div>
      <div className="movie-title">{movie?.name || " Movie Not Found "}</div>
    </div>
  );
}

export default MovieCard;
