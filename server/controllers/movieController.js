const tmdbService = require("../services/tmdbService");

const movieController = {
  getTrendingMovies: async (req, res) => {
    try {
      const { timeWindow = "week", language = "en-US" } = req.query;
      const data = await tmdbService.getTrendingMovies(timeWindow, language);

      res.json({
        success: true,
        data: data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("TMDB API Error:", error.response?.data || error.message);

      res.status(error.response?.status || 500).json({
        success: false,
        error:
          error.response?.data?.status_message ||
          "Failed to fetch trending movies",
        code: error.response?.data?.status_code || 500,
      });
    }
  },
};

module.exports = movieController;
