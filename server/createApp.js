const express = require("express");

function createApp({ movieController, tvController }) {
  const app = express();
  app.use(express.json());

  app.get("/api/movies/trending", movieController.getTrendingMovies);
  app.get("/api/tv/trending", tvController.getTrendingTV);

  return app;
}

module.exports = createApp;
