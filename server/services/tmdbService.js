const axios = require("axios");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 5000,
  headers: {
    Connection: "close", // Prevent connection reuse issues
    Accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});

const tmdbService = {
  getTrendingMovies: async (timeWindow = "week", language = "en-US") => {
    if (!process.env.TMDB_API_KEY) {
      throw new Error("TMDB_API_KEY is not configured");
    }
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/movie/${timeWindow}?language=${language}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        timeout: 5000,
      }
    );
    return response.data;
  },
  getTrendingTV: async (timeWindow = "week", language = "en-US") => {
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/tv/${timeWindow}?language=${language}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        timeout: 5000,
      }
    );
    return response.data;
  },
};

module.exports = tmdbService;
