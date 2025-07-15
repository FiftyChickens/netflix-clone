const axios = require("axios");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Export the raw functions for testing
exports._createAxiosInstance = (apiKey) => {
  return axios.create({
    baseURL: TMDB_BASE_URL,
    timeout: 5000,
    headers: {
      Connection: "close",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey || process.env.TMDB_API_KEY}`,
    },
  });
};

// Use a factory pattern for the service
exports._createTmdbService = (axiosInstance) => ({
  getTrendingMovies: async (timeWindow = "week", language = "en-US") => {
    const response = await axiosInstance.get(`/trending/movie/${timeWindow}`, {
      params: { language },
    });
    return response.data;
  },
  getTrendingTV: async (timeWindow = "week", language = "en-US") => {
    const response = await axiosInstance.get(`/trending/tv/${timeWindow}`, {
      params: { language },
    });
    return response.data;
  },
});

// Production instance
const axiosInstance = exports._createAxiosInstance();
const tmdbService = exports._createTmdbService(axiosInstance);

// Add API key check middleware
const withApiKeyCheck = (service) => {
  return {
    ...service,
    getTrendingMovies: async (...args) => {
      if (!process.env.TMDB_API_KEY) {
        throw new Error("TMDB_API_KEY is not configured");
      }
      return service.getTrendingMovies(...args);
    },
  };
};

module.exports = withApiKeyCheck(tmdbService);
module.exports._testExports = {
  _createAxiosInstance: exports._createAxiosInstance,
  _createTmdbService: exports._createTmdbService,
  axiosInstance,
};
