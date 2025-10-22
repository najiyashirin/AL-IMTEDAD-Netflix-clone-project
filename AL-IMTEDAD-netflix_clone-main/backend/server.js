const express = require("express");
const cors = require("cors");
const path = require("path");
const movieRoutes = require("./routes/movieRoutes");

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/movies", movieRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err.message);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

try {
  app.listen(port, () => {
    console.log(`SERVER STARTED AT ${port}`);
  });
} catch (err) {
  console.error("Failed to start server:", err.message);
  process.exit(1);
}
