const express = require("express");
const router = express.Router();
const { getAllMovies, movieFull } = require("../controllers/movieControllers");


router.post("/play/:movieId", async (req, res, next) => {
  try {
    await movieFull(req, res);
  } catch (err) {
    console.error(
      `Unexpected error for ${req.params.movieId}:`,
      err.message
    );
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.get("/", async (req, res, next) => {
  try {
    await getAllMovies(req, res);
  } catch (err) {
    console.error("Unexpected error :", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
module.exports = router;
