const movies = require("../movies.json");

const getAllMovies = (req, res) => {
  try {
    if (!movies || !Array.isArray(movies)) {
      throw new Error("Movies data is invalid or missing");
    }
    res.json(movies);
  } catch (error) {
    console.error("Error in getAllMovies:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch movies", error: error.message });
  }
};

const movieFull = (req, res) => {
  try {
    const movieId = req.params.movieId;
    if (!movieId) throw new Error("Movie ID is required");
    const movie = movies.find((m) => m.id == movieId);

    if (!movie) {
      return res
        .status(404)
        .json({ message: `Movie with ID ${movieId} not found` });
    }
    if (!movie.name || !movie.streamURL || !movie.streamURL.fullscreen) {
      throw new Error(` ${movieId} not available`);
    }
    console.log(`${movie.name} ID:${movie.id} playing`);
    res.json({ message: `now playing ${movie.name}` });
  } catch (error) {
    console.error("Error", error.message);
    res
      .status(500)
      .json({ message: "Failed to playback", error: error.message });
  }
};

module.exports = {
  getAllMovies,
  movieFull,
};
