const axios = require("axios");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdbService = {
  getTrendingMovies: async (timeWindow = "week", language = "en-US") => {
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/movie/${timeWindow}?language=${language}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );
    return response.data;
  },
};

module.exports = tmdbService;
