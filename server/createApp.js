const express = require("express");

function createApp({ movieController, tvController, searchController }) {
  const app = express();
  app.use(express.json());

  app.get("/api/movies/trending", movieController.getTrendingMovies);
  app.get("/api/movies/genre", movieController.getMoviesByGenre);
  app.get("/api/tv/trending", tvController.getTrendingTV);
  app.get("/api/tv/genre", tvController.getTvByGenre);
  app.get("/api/search", searchController.searchMulti);

  return app;
}

module.exports = createApp;
