import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/movies`);
    if (!res || !res.data) throw new Error("Invalid response from server");
    return res;
  } catch (err) {
    console.error("Error fetching movies:", err.message);
    throw err;
  }
};

export const playMovie = async (movieId) => {
  try {
    if (!movieId) throw new Error("Movie ID is required for playback");
    const res = await axios.post(`${BASE_URL}/movies/play/${movieId}`);
    if (!res || !res.data) throw new Error("Invalid response from server");
    return res;
  } catch (err) {
    console.error(`Error playing movie ID ${movieId}:`, err.message);
    throw err;
  }
};
