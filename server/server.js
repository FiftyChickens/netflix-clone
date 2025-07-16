require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Controllers
const movieRoutes = require("./routes/movies");
const tvRoutes = require("./routes/tv");

// CORS and middleware
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/api/movies", movieRoutes);
app.use("/api/genre", movieRoutes);

app.use("/api/tv", tvRoutes);
app.use("/api/genre", tvRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

// Only start server if not in test
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 8080;
  const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  module.exports = { app, server };
} else {
  module.exports = app;
}
