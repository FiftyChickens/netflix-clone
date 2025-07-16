const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/trending", movieController.getTrendingMovies);
router.get("/genre", movieController.getMoviesByGenre);

module.exports = router;
